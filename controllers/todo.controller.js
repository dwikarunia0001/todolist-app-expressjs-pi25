const Todo = require('../models/todo.model');

module.exports = {
  // POST /todos — Create new todo
  createTodo: async (req, res) => {
    try {
      const { title, description } = req.body;

      if (!title) {
        return res.status(400).json({ message: 'Title is required' });
      }

      const newTodo = new Todo({
        title,
        description: description || ''
      });

      await newTodo.save();

      res.status(201).json({
        message: 'Todo created successfully',
         newTodo
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({ message: 'Validation error', errors: messages });
      }
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  },

  // GET /todos — Get all todos
  getTodos: async (req, res) => {
    try {
      const todos = await Todo.find().sort({ createdAt: -1 });
      res.status(200).json({
        message: 'Todos retrieved successfully',
        count: todos.length,
         todos
      });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  },

  // GET /todos/:id — Get single todo by ID
  getTodoById: async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      res.status(200).json({
        message: 'Todo retrieved successfully',
         todo
      });
    } catch (error) {
      if (error.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid todo ID' });
      }
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  },

  // PUT /todos/:id — Update todo
  updateTodo: async (req, res) => {
    try {
      const { title, description, completed } = req.body;

      const todo = await Todo.findByIdAndUpdate(
        req.params.id,
        { title, description, completed },
        { new: true, runValidators: true }
      );

      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }

      res.status(200).json({
        message: 'Todo updated successfully',
         todo
      });
    } catch (error) {
      if (error.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid todo ID' });
      }
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({ message: 'Validation error', errors: messages });
      }
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  },

  // DELETE /todos/:id — Delete single todo
  deleteTodo: async (req, res) => {
    try {
      const todo = await Todo.findByIdAndDelete(req.params.id);
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      res.status(200).json({
        message: 'Todo deleted successfully'
      });
    } catch (error) {
      if (error.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid todo ID' });
      }
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  },

  // DELETE /todos — Delete ALL todos
  deleteAllTodos: async (req, res) => {
    try {
      const result = await Todo.deleteMany({});
      res.status(200).json({
        message: 'All todos deleted successfully',
        deletedCount: result.deletedCount
      });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  }
};