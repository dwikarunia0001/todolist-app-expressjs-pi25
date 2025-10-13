const express = require("express")
const router = express.Router();

const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/user.controller");

const { verifyAdmin } = require("../middleware/auth");

router.get("/", verifyAdmin, getAllUser)
router.get("/:id", verifyAdmin, getUserById)
router.post("/", verifyAdmin, createUser)
router.put("/:id", verifyAdmin, updateUser)
router.delete("/:id", verifyAdmin, deleteUser)

module.exports = router;