import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, index: true },
    author: { type: String, required: true, trim: true, index: true },
    description: { type: String, default: "" },
    coverUrl: { type: String, default: "" },
    genres: [{ type: String, trim: true, index: true }],
    averageRating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);
