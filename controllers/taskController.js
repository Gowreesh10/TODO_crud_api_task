const Task = require('../models/task');
const { STATUS } = require('../constant');

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });
        res.json(tasks);
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Server error' , error: error.message});
    }
};

const createTask = async (req, res) => {
    const userReq = req.body;
    try {
        const task = new Task({
            ...userReq,
            userId: req.user.id
        });
        await task.save();
        res.status(STATUS.CREATED).json(task);
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Server error' , error: error.message});
    }
};


const updateTask = async (req, res) => {
    const { title, description, status } = req.body;

    try {
        const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
        if (!task) {
            return res.status(STATUS.NOT_FOUND).json({ message: 'Task not found' });
        }

        task.title = title;
        task.description = description;
        task.status = status;

        await task.save();
        res.json(task);
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Server error' , error: error.message});
    }
};

const deleteTask = async (req, res) => {

    try {
        const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
        if (!task) {
            return res.status(STATUS.NOT_FOUND).json({ message: 'Task not found' });
        }

        await task.deleteOne();
        res.json({ message: 'Task removed' });
    } catch (error) {
        console.error('Error while deleting task:', error);
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Server error', error: error.message });
    }
};


module.exports = { getTasks, createTask, updateTask, deleteTask };
