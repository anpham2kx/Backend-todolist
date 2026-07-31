const express = require("express");
const connectDB = require("./db/dbConnect");
const cors = require('cors');
const TaskRoute = require('./routes/TaskRoute');
const app = express();
const port = 3000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("", TaskRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
