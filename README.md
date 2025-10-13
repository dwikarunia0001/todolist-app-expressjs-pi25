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

---

## 📊 Daftar Endpoint API
### 🔓 1. Auth (Publik)
***

#### POST `/api/auth/register`
Daftar user baru.

**Request Body:**
```json
{
"username": "john_doe",
"email": "john@example.com",
"password": "secure123"
}
```

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
```

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
```

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
```

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

### 👤 2. User Management (Hanya Admin) 
(🔒 Memerlukan token dengan role: "admin")
***

#### GET `/api/users`
Dapatkan semua user.

**Response Success (Status 200):**
```json
{
  "message": "Successfully get all users",
  "data": [
    {
      "_id": "68ebdee86b23f1c2c213c27a",
      "username": "john_doe",
      "email": "john@example.com",
      "role": "user"
    },
    {
      "_id": "68ebd54a0ffca9553027ea12",
      "username": "admin",
      "email": "admin@example.com",
      "role": "admin"
    }
  ]
}
```

**Error Responses:**
- 401 Unauthorized (Token tidak valid/tidak ada):
   ```json
   {
      "message": "Invalid header"
   }
- 403 Forbidden (Bukan admin):
   ```json
   {
      "message": "Access denied. Admin only."
   }
- 500 Internal Server Error:
   ```json
   {
      "message": "Internal server error",
      "error": "..."
   }

#### GET `/api/users/:id`
Dapatkan user by ID.

**Response Success (Status 200):**
```json
{
  "message": "User retrieved successfully",
  "data": {
    "_id": "68ebdee86b23f1c2c213c27a",
    "username": "john_doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Error Responses:**
- 401/403 (Sama seperti di atas):
- 400 Bad Request (ID tidak valid):
   ```json
   {
      "message": "Invalid user ID"
   }
- 404 Not Found (User tidak ditemukan):
   ```json
   {
      "message": "User not found"
   }

#### POST `/api/users`
Buat user baru.

**Request Body:**
```json
{
  "username": "jane_doe",
  "email": "jane@example.com",
  "password": "jane123"
}
```

**Response Success (Status 201):**
```json
{
  "message": "User created successfully",
  "data": {
    "_id": "68ec01a2b3c4d5e6f7g8h9i0",
    "username": "jane_doe",
    "email": "jane@example.com",
    "role": "user"
  }
}
```

**Error Responses:**
- 401/403 (Sama seperti di atas):
- 400 Bad Request (Validasi/email duplikat):
   ```json
   {
      "message": "Username or email already in use"
   }

#### PUT `/api/users/:id`
Perbarui user.

**Request Body:**
```json
{
  "username": "john_updated",
  "email": "john_new@example.com"
}
```

**Response Success (Status 200):**
```json
{
  "message": "User updated successfully",
  "data": {
    "_id": "68ebdee86b23f1c2c213c27a",
    "username": "john_updated",
    "email": "john_new@example.com",
    "role": "user"
  }
}
```

**Error Responses:**
- 401/403 (Sama seperti di atas):
- 400 Bad Request (Validasi gagal):
   ```json
   {
      "message": "Validation error",
      "errors": ["..."]
   }

#### DELETE `/api/users/:id`
Hapus user.

**Response Success (Status 200):**
```json
{
  "message": "User deleted successfully"
}
```

**Error Responses:**
- 401/403/400/404 (Sama seperti di atas)

### 👤 3. Todo Management (User Terotentikasi) 
- 🔒 Memerlukan token
- 💡 Hanya bisa akses todo milik sendiri 
***

#### POST `/api/todos`
Buat todo baru.

**Request Body:**
```json
{
  "title": "Belajar Express.js",
  "description": "Membuat REST API dengan JWT",
  "completed": false
}
```

**Response Success (Status 201):**
```json
{
  "message": "Todo created",
  "data": {
    "_id": "68ec02b3c4d5e6f7g8h9i1j2",
    "title": "Belajar Express.js",
    "description": "Membuat REST API dengan JWT",
    "completed": false,
    "user": "68ebdee86b23f1c2c213c27a",
    "createdAt": "2025-10-12T18:00:00.000Z",
    "updatedAt": "2025-10-12T18:00:00.000Z"
  }
}
```

**Error Responses:**
- 401 Unauthorized (Token tidak valid):
   ```json
   {
      "message": "Invalid header"
   }
- 400 Bad Request (Title wajib):
   ```json
   {
      "message": "Title is required"
   }
- 500 Internal Server Error:
   ```json
   {
      "message": "Server error",
      "error": "..."
   }

#### GET `/api/todos`
Dapatkan semua todo Anda.

**Response Success (Status 200):**
```json
{
  "message": "Your todos retrieved",
  "count": 1,
  "data": [
    {
      "_id": "68ec02b3c4d5e6f7g8h9i1j2",
      "title": "Belajar Express.js",
      "description": "Membuat REST API dengan JWT",
      "completed": false,
      "user": "68ebdee86b23f1c2c213c27a"
    }
  ]
}
```

**Error Responses:**
- 401 Unauthorized (Token tidak valid):
   ```json
   {
      "message": "Invalid header"
   }
- 500 Internal Server Error:
   ```json
   {
      "message": "Server error",
      "error": "..."
   }

#### GET `/api/todos/:id`
Dapatkan detail todo Anda.

**Response Success (Status 200):**
```json
{
  "message": "Todo retrieved",
  "data": {
    "_id": "68ec02b3c4d5e6f7g8h9i1j2",
    "title": "Belajar Express.js",
    "description": "Membuat REST API dengan JWT",
    "completed": false,
    "user": "68ebdee86b23f1c2c213c27a"
  }
}
```

**Error Responses:**
- 401 Unauthorized (Token tidak valid):
   ```json
   {
      "message": "Invalid header"
   }
- 400 Bad Request (ID tidak valid): 
   ```json
   {
      "message": "Invalid todo ID"
   }
- 404 Not Found (Todo tidak ditemukan atau bukan milik Anda):
   ```json
   {
      "message": "Todo not found or access denied"
   }

#### PUT `/api/todos/:id`
Perbarui todo Anda.

**Request Body:**
```json
{
  "completed": true
}
```

**Response Success (Status 200):**
```json
{
  "message": "Todo updated successfully",
  "data": {
    "_id": "68ec02b3c4d5e6f7g8h9i1j2",
    "title": "Belajar Express.js",
    "description": "Membuat REST API dengan JWT",
    "completed": true,
    "user": "68ebdee86b23f1c2c213c27a"
  }
}
```

**Error Responses:**
- 401/400/404 (Sama seperti di atas)
- 400 Bad Request (Validasi gagal): 
   ```json
   {
      "message": "Validation error",
      "errors": ["..."]
   }

#### DELETE `/api/todos/:id`
Hapus todo Anda.

**Response Success (Status 200):**
```json
{
  "message": "Todo deleted successfully"
}
```

**Error Responses:**
- 401/400/404 (Sama seperti di atas)

#### DELETE `/api/todos`
Hapus semua todo Anda.

**Response Success (Status 200):**
```json
{
  "message": "All your todos deleted successfully",
  "deletedCount": 1
}
```

**Error Responses:**
- 401 Unauthorized:
   ```json
   {
      "message": "Invalid header"
   }
- 500 Internal Server Error:
   ```json
   {
      "message": "Server error",
      "error": "..."
   }