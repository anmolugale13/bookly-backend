import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Book from "./models/Book.js";

dotenv.config();

const books = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    description: "Tiny changes, remarkable results.",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/I/51-uspgqWIL.jpg",
    genres: ["Self-help", "Productivity"]
  },
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt, David Thomas",
    description: "Journey to mastery.",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/I/41as+WafrFL.jpg",
    genres: ["Technology", "Software"]
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    description: "A fable about following your dreams.",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/I/51Z0nLAfLmL.jpg",
    genres: ["Fiction", "Philosophy"]
  }
];

(async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Book.deleteMany();
    await Book.insertMany(books);
    console.log("Seeded books");
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
