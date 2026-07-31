const express = require('express');
const router = express.Router();
const {getAllTask, addNewTask, deleteTask} = require("../controller/TaskController");

router.get('/tasks', getAllTask);

router.post('/tasks', addNewTask);

router.delete('/tasks/:id', deleteTask);

module.exports = router;