const Task = require('../models/Task');
const User = require('../models/User');
const { getISOWeek, getYear } = require('date-fns');

// Create Task
exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, status = "Pending", completed = false } = req.body;

    const newTask = new Task({
      title,
      description,
      dueDate,
      status,
      completed,
      userId: req.user.id,
      owner: req.user.id,
    });

    const savedTask = await newTask.save();

    req.io.emit('notification', { message: 'A new task was created!' });

    res.status(201).json(savedTask);
  } catch (error) {
    console.error('❌ Error creating task:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all tasks (owned)
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (error) {
    console.error('❌ Error getting tasks:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get a specific task
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      $or: [{ owner: req.user.id }, { sharedWith: req.user.id }]
    });

    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json(task);
  } catch (error) {
    console.error('❌ Error getting task:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      req.body,
      { new: true }
    );

    if (!task) return res.status(404).json({ message: 'Task not found or unauthorized' });

    res.json(task);
  } catch (error) {
    console.error('Error updating task:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user.id });

    if (!deleted) return res.status(404).json({ message: 'Task not found or unauthorized' });

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get shared tasks
exports.getSharedTasks = async (req, res) => {
  try {
    const sharedTasks = await Task.find({ sharedWith: req.user.id });
    res.json(sharedTasks);
  } catch (error) {
    console.error('Error getting shared tasks:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Share Task (PUT by task ID)
exports.shareTask = async (req, res) => {
  try {
    const { email } = req.body;
    const userToShare = await User.findOne({ email });

    if (!userToShare) return res.status(404).json({ message: 'User not found' });

    const task = await Task.findOne({ _id: req.params.id, owner: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found or unauthorized' });

    if (!task.sharedWith.includes(userToShare._id)) {
      task.sharedWith.push(userToShare._id);
      await task.save();

      req.io.emit('notification', { message: `Task shared with ${email}` });
    }

    res.json({ message: 'Task shared successfully', task });
  } catch (error) {
    console.error('Error sharing task:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Share Task by Email (POST)
exports.shareTaskByEmail = async (req, res) => {
  try {
    const { taskId, email } = req.body;

    const userToShare = await User.findOne({ email });
    if (!userToShare) return res.status(404).json({ message: 'User not found' });

    const task = await Task.findOne({ _id: taskId, owner: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found or unauthorized' });

    if (!task.sharedWith.includes(userToShare._id)) {
      task.sharedWith.push(userToShare._id);
      await task.save();

      req.io.emit('notification', { message: `Task shared via email to ${email}` });
    }

    res.json({ message: 'Task shared successfully via email', task });
  } catch (error) {
    console.error('Error sharing task by email:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Task Analytics
exports.getTaskAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.find({ userId });

    const statusCounts = tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {});

    const tasksPerWeek = {};
    tasks.forEach(task => {
      const week = `Week ${getISOWeek(task.createdAt)}, ${getYear(task.createdAt)}`;
      tasksPerWeek[week] = (tasksPerWeek[week] || 0) + 1;
    });

    return res.json({
      statusCounts,
      tasksPerWeek,
    });
  } catch (error) {
    console.error("Analytics error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};
