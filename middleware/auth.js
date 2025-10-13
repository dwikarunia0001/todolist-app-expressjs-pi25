const jwt = require("jsonwebtoken");

module.exports = {
  verifyToken: (req, res, next) => {
    try {
      const header = req.header("Authorization");
      if (!header) {
        return res.status(401).json({ message: "Invalid header" });
      }

      // Format: "Bearer <token>"
      const token = header.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Invalid token" });
      }

      // Verifikasi token dengan secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) {
        return res.status(401).json({ message: "Invalid token" });
      }

      // Simpan data user ke request
      req.user = decoded;
      next();
    } catch (e) {
      return res.status(401).json({
        message: "Token verification failed",
        error: e.message
      });
    }
  },
  verifyAdmin: (req, res, next) => {
    try {
      const header = req.header("Authorization");
      if (!header) {
        return res.status(401).json({ message: "Invalid header" });
      }

      const token = header.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Invalid token" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      if (decoded.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admin only." });
      }

      req.user = decoded;
      next();
    } catch (e) {
      return res.status(401).json({
        message: "Admin token verification failed",
        error: e.message
      });
    }
  }
};