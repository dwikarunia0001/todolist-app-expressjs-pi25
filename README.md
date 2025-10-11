# 📝 ToDoList RESTful API

Aplikasi ToDoList sederhana dengan fitur autentikasi berbasis JWT, dibangun menggunakan **Express.js**, **MongoDB (Mongoose)**, **bcryptjs**, dan **jsonwebtoken**.

---

## 🚀 Fitur

- ✅ Register & Login (JWT Authentication)
- ✅ CRUD Todo (Create, Read, Update, Delete)
- ✅ Authorization berbasis user (user hanya bisa mengakses todonya sendiri)
- ✅ Validasi input & error handling
- ✅ Response code HTTP yang sesuai standar

---

## 🛠️ Teknologi yang Digunakan

- Node.js
- Express.js
- MongoDB + Mongoose
- bcryptjs (enkripsi password)
- jsonwebtoken (JWT authentication)
- dotenv (manajemen environment variables)

---

## 📥 Instalasi

1. Clone repositori ini:
   ```bash
   git clone https://github.com/dwikarunia0001/todolist-app-expressjs-pi25.git
   cd todolist-app-expressjs-pi25
   npm install
   cp .env.example .env 
   npm run dev