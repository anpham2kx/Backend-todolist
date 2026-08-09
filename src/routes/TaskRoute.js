const express = require('express');
const router = express.Router();
const {getAllTask, addNewTask, updateTask, deleteTask, getTaskStatistics} = require("../controller/TaskController");

router.get('/tasks', getAllTask);
router.get('/tasks/statistics', getTaskStatistics);

router.post('/tasks', addNewTask);

router.put('/tasks/:id', updateTask);

router.delete('/tasks/:id', deleteTask);

module.exports = router;