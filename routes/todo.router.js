const express = require('express');
const {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
  deleteAllTodos
} = require('../controllers/todo.controller');

const router = express.Router();

router.route('/')
  .post(createTodo)
  .get(getTodos)
  .delete(deleteAllTodos);

router.route('/:id')
  .get(getTodoById)
  .put(updateTodo)
  .delete(deleteTodo);

module.exports = router;