const Task = require("../model/Task");

const getAllTask = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).send("Error");
    console.error(error);
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

const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).send("Error");
    console.error(error);
  }
};

module.exports = {getAllTask, addNewTask, deleteTask}