# 📚 Bookly — Elegant Book Catalog App

Bookly is a full-stack book cataloging platform built with **React + Vite** on the frontend and **Node.js + Express + MongoDB** on the backend. It allows users to browse, filter, and review books with a premium, mobile-friendly experience. Designed with a nude-tone aesthetic and frustration-free UX, Bookly is built for elegance and performance.

---

## 🚀 Live Demo

👉(https://anmolugale13.github.io/bookly-frontend/)

---

## 🛠 Tech Stack

| Frontend        | Backend           | Deployment       |
|-----------------|-------------------|------------------|
| React + Vite    | Node.js + Express | GitHub Pages (frontend) |
| Inline CSS      | MongoDB Atlas     | Render / Railway / VPS (backend) |
| Axios           | JWT Auth          | HashRouter + 404 fallback |
| React Router    | RESTful API       | Vite base config |

---

## ✨ Features

- 🔍 Search & filter books by title, genre, rating, and sort order  
- 📖 View book details with cover, author, genres, and reviews  
- 🧠 User authentication with protected routes  
- 📝 Add new books with image upload and validation  
- 📱 Responsive design for mobile and desktop  
- 🎨 Nude-tone UI for elegant, modern aesthetics  
- 🧭 404-safe routing for GitHub Pages reloads  
- 🔐 Secure backend with JWT and role-based access


---

## 📦 Backend Folder Structure
backend/

├── node_modules/              # Installed npm packages

│

├── src/                       # Source code

│   ├── config/                # Configuration files

│   │   └── db.js              # MongoDB connection setup

│   │

│   ├── middleware/            # Express middleware

│   │   └── auth.js            # JWT authentication middleware

│   │

│   ├── models/                # Mongoose schemas

│   │   ├── Book.js            # Book model

│   │   ├── Review.js          # Review model

│   │   └── User.js            # User model

│   │

│   ├── routes/                # API route definitions

│   │   ├── auth.js            # Auth routes (login, signup)

│   │   ├── books.js           # Book-related routes

│   │   └── reviews.js         # Review-related routes

│   │

│   ├── utils/                 # Utility functions

│   │   ├── rating.js          # Rating calculation logic

│   │   ├── index.js           # Utility index (optional)

│   │   └── seed.js            # Seed script for initial data

│

├── .env                       # Environment variables

├── .gitignore                 # Git ignore rules

├── package-lock.json          # npm lock file

├── package.json               # Project metadata and dependencies

└── README.md                  # Project documentation


