const express = require('express');
const app = express();
const dotenv = require('dotenv');
const allRoutes = require('./routes');
const connectToDb = require('./config/db');

dotenv.config();
const PORT = process.env.PORT || 3000;
connectToDb();

app.use(allRoutes);

// Route dasar untuk cek apakah server hidup
app.get('/', (req, res) => {
  res.send('✅ Server berjalan dengan baik!');
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
