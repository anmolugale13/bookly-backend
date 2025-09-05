import { Router } from "express";
import { body, validationResult } from "express-validator";
import Book from "../models/Book.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// List with search/filter/sort/pagination
router.get("/", async (req, res) => {
  const {
    q = "",
    genre,
    minRating,
    sort = "newest", // newest | rating | reviews
    page = 1,
    limit = 12
  } = req.query;

  const filter = {};
  if (q) {
    filter.$or = [
      { title: { $regex: q, $options: "i" } },
      { author: { $regex: q, $options: "i" } }
    ];
  }
  if (genre) filter.genres = genre;
  if (minRating) filter.averageRating = { $gte: Number(minRating) };

  const sortMap = {
    newest: { createdAt: -1 },
    rating: { averageRating: -1 },
    reviews: { reviewCount: -1 }
  };

  const pageNum = Number(page);
  const limitNum = Number(limit);
  const total = await Book.countDocuments(filter);
  const books = await Book.find(filter)
    .sort(sortMap[sort] || sortMap.newest)
    .skip((pageNum - 1) * limitNum)
    .limit(limitNum);

  res.json({
    data: books,
    meta: { total, page: pageNum, limit: limitNum, pages: Math.ceil(total / limitNum) }
  });
});

// Book details
router.get("/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});

// Optional: add a book (any authenticated user for MVP)
router.post(
  "/",
  requireAuth,
  [
    body("title").trim().notEmpty(),
    body("author").trim().notEmpty(),
    body("description").optional().isString(),
    body("coverUrl").optional().isString(),
    body("genres").optional().isArray()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const book = await (await Book.create(req.body)).populate();
    res.status(201).json(book);
  }
);

export default router;
