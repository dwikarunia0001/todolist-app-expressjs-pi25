const express = require("express");
const router = express.Router();

const {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodos
} = require("../controllers/todo.controller");

const { verifyToken } = require("../middleware/auth");

router.get("/", verifyToken, getTodos);
router.get("/:id", verifyToken, getTodoById);
router.post("/", verifyToken, createTodo);
router.put("/:id", verifyToken, updateTodo);
router.delete("/:id", verifyToken, deleteTodo);
router.delete("/", verifyToken, deleteAllTodos);

module.exports = router;