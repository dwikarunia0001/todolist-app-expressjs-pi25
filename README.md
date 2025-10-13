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
   ```bash
   npm install
3. Siapkan file environment:
   ```bash
   cp .env.example .env 
4. Edit .env dan sesuaikan
   ```bash
   MONGODB_URI=mongodb://localhost:27017/todolist
   JWT_SECRET=rahasia_panjang_dan_aman_12345!_ganti_di_produksi
   PORT=3000
5. Jalankan server
   ```bash
   npm run dev

---

## 🔐 Autentikasi & Otorisasi
- Semua endpoint Todo dan User memerlukan header:
   ```bash
   Authorization: Bearer <your-jwt-token>
- Token didapatkan dari login (POST /api/auth/login)
- User biasa hanya bisa akses todonya sendiri
- Admin bisa akses semua user (tapi tetap hanya todo-nya sendiri)

## 📊 Daftar Endpoint API
### 🔓 1. Auth (Publik)

#### POST `/api/auth/register`
Daftar user baru.

**Request Body:**
```json
{
"username": "john_doe",
"email": "john@example.com",
"password": "secure123"
}

**Response Success (Status 201):**
```json
{
  "message": "User registered successfully",
  "data": {
    "_id": "68ebdee86b23f1c2c213c27a",
    "username": "john_doe",
    "email": "john@example.com",
    "role": "user"
  }
}

**Error Responses:**
- 400 Bad Request (Email/username sudah dipakai):
   ```json
   {
   "message": "Username or email already in use"
   }
- 400 Bad Request (Validasi gagal):
   ```json
   {
      "message": "Validation error",
      "errors": [
         "Password must be at least 6 characters",
         "Please enter a valid email"
      ]
   }
- 500 Internal Server Error:
   ```json
   {
      "message": "Internal server error",
      "error": "..."
   }

#### POST `/api/auth/login`
Login user/admin.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "secure123"
}

**Response Success (Status 200):**
```json
{
  "message": "Login successful",
  "data": {
    "_id": "68ebdee86b23f1c2c213c27a",
    "username": "john_doe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx"
  }
}

**Error Responses:**
- 401 Unauthorized (Email/password salah):
   ```json
   {
   "message": "Invalid email or password"
   }
- 500 Internal Server Error:
   ```json
   {
   "message": "Internal server error",
   "error": "..."
   }