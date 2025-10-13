# 📝 ToDoList RESTful API

Aplikasi ToDoList sederhana dengan fitur autentikasi berbasis JWT, dibangun menggunakan **Express.js**, **MongoDB (Mongoose)**, **bcryptjs**, dan **jsonwebtoken**.

---

## 🚀 Fitur

- ✅ Register & Login (JWT Authentication)
- ✅ CRUD Todo (Create, Read, Update, Delete)
- ✅ Authorization berbasis user (user hanya bisa mengakses todonya sendiri)
- ✅ Validasi input & error handling
- ✅ Response code HTTP yang sesuai standar
- ✅ Role-based access: **User** vs **Admin**
  - User: kelola todo sendiri
  - Admin: kelola semua user

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
2. Install dependencies:
   npm install
3. Siapkan file environment:
   cp .env.example .env 
4. Edit .env dan sesuaikan
   MONGODB_URI=mongodb://localhost:27017/todolist
   JWT_SECRET=rahasia_panjang_dan_aman_12345!_ganti_di_produksi
   PORT=3000
5. Jalankan server
   npm run dev