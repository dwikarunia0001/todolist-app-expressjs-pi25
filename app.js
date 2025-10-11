const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Route dasar untuk cek apakah server hidup
app.get('/', (req, res) => {
  res.send('✅ Server berjalan dengan baik!');
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
