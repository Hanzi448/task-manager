const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/', authenticateToken, taskController.createTask);
router.get('/', authenticateToken, taskController.getTasks);

router.get('/shared', authenticateToken, taskController.getSharedTasks);
router.get('/analytics', authenticateToken, taskController.getTaskAnalytics);

router.post('/shared/share', authenticateToken, taskController.shareTaskByEmail);
router.put('/:id/share', authenticateToken, taskController.shareTask);

router.get('/:id', authenticateToken, taskController.getTask);
router.put('/:id', authenticateToken, taskController.updateTask);
router.delete('/:id', authenticateToken, taskController.deleteTask);

module.exports = router;
