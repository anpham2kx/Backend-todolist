const Task = require("../model/Task");

const getAllTask = async (req, res) => {
  try {
    const { status, page = 1, limit = 4 } = req.query;

    let queryCondition = {};

    if (status === "in-progress") {
      queryCondition.completed = false;
    } else if (status === "completed") {
      queryCondition.completed = true;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const tasks = await Task.find(queryCondition)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const totalItems = await Task.countDocuments(queryCondition);
    const totalPages = Math.ceil(totalItems / Number(limit));

    res.status(200).json({
      tasks: tasks,
      totalPages: totalPages,
    });
  } catch (error) {
    res.status(500).send("Error");
    console.error(error);
  }
};

const getTaskStatistics = async (req, res) => {
  try {
    const [total, inProgress, completed] = await Promise.all([
      Task.countDocuments(),
      Task.countDocuments({ completed: false }),
      Task.countDocuments({ completed: true }),
    ]);

    res.status(200).json({
      totalTasks: total,
      inProgressTasks: inProgress,
      completedTasks: completed,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server khi thống kê nhiệm vụ" });
  }
};

const addNewTask = async (req, res) => {
  try {
    const newTask = await Task.create({
      text: req.body.text,
    });
    res.status(201).json({ success: true, data: newTask });
  } catch (error) {
    if (error.name === "ValidationError") {
      const loi = error.errors.text.message;
      return res.status(400).json({ errorMsg: loi });
    }
    res.status(500).json({ errorMsg: "Lỗi server nội bộ" });
  }
};

const updateTask = async (req, res) => {
  try {
    const id = req.params.id;

    if (req.body.completed === true) {
      req.body.completedAt = new Date();
    } else if (req.body.completed === false) {
      req.body.completedAt = null;
    }

    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedTask });
  } catch (error) {
    res.status(500).json({ errorMsg: "Lỗi server nội bộ" });
  }
};

const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).send("Error");
    console.error(error);
  }
};

module.exports = {
  getAllTask,
  addNewTask,
  updateTask,
  deleteTask,
  getTaskStatistics,
};
