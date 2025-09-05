import Review from "../models/Review.js";
import Book from "../models/Book.js";

export async function recomputeBookRating(bookId) {
  const agg = await Review.aggregate([
    { $match: { book: new (await import("mongoose")).default.Types.ObjectId(bookId) } },
    { $group: { _id: "$book", avg: { $avg: "$rating" }, count: { $sum: 1 } } }
  ]);

  const { avg = 0, count = 0 } = agg[0] || {};
  await Book.findByIdAndUpdate(bookId, {
    averageRating: Math.round((avg + Number.EPSILON) * 10) / 10,
    reviewCount: count
  });
}
