import { Router } from "express";
import { body, validationResult } from "express-validator";
import Review from "../models/Review.js";
import Book from "../models/Book.js";
import { requireAuth } from "../middleware/auth.js";
import { recomputeBookRating } from "../utils/rating.js";

const router = Router();

// List reviews for a book
router.get("/book/:bookId", async (req, res) => {
  const reviews = await Review.find({ book: req.params.bookId })
    .populate("user", "name")
    .sort({ createdAt: -1 });
  res.json(reviews);
});

// Create review (one per user per book)
router.post(
  "/:bookId",
  requireAuth,
  [body("rating").isInt({ min: 1, max: 5 }), body("comment").optional().isString()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { rating, comment = "" } = req.body;
    const book = await Book.findById(req.params.bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    try {
      const review = await Review.create({
        user: req.user._id,
        book: book._id,
        rating,
        comment
      });
      await recomputeBookRating(book._id);
      res.status(201).json(await review.populate("user", "name"));
    } catch (e) {
      if (e.code === 11000) {
        return res.status(400).json({ message: "You have already reviewed this book" });
      }
      throw e;
    }
  }
);

// Update review (owner only)
router.put(
  "/:reviewId",
  requireAuth,
  [body("rating").optional().isInt({ min: 1, max: 5 }), body("comment").optional().isString()],
  async (req, res) => {
    const review = await Review.findById(req.params.reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });
    if (review.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Forbidden" });

    if (req.body.rating !== undefined) review.rating = req.body.rating;
    if (req.body.comment !== undefined) review.comment = req.body.comment;
    await review.save();
    await recomputeBookRating(review.book);
    res.json(await review.populate("user", "name"));
  }
);

// Delete review (owner or admin)
router.delete("/:reviewId", requireAuth, async (req, res) => {
  const review = await Review.findById(req.params.reviewId);
  if (!review) return res.status(404).json({ message: "Review not found" });
  const isOwner = review.user.toString() === req.user._id.toString();
  const isAdmin = req.user.role === "admin";
  if (!isOwner && !isAdmin) return res.status(403).json({ message: "Forbidden" });

  const bookId = review.book;
  await review.deleteOne();
  await recomputeBookRating(bookId);
  res.json({ message: "Review deleted" });
});

export default router;
