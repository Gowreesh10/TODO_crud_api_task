const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { taskSchema } = require('../validators/taskValidator');
const router = express.Router();

router.get('/tasks', authMiddleware, getTasks);
router.post('/tasks', authMiddleware, validate(taskSchema), createTask);
router.put('/tasks/:id', authMiddleware, validate(taskSchema), updateTask);
router.delete('/tasks/:id', authMiddleware, deleteTask);

module.exports = router;
