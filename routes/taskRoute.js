const express = require('express');
const taskRouter = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

taskRouter.post('/addTask', authMiddleware, taskController.addTask);

taskRouter.post('/getTasks', authMiddleware, taskController.getTasks);

taskRouter.delete('/deleteTask', authMiddleware, taskController.deleteTask);


module.exports = taskRouter;
