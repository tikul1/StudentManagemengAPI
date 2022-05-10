const express = require("express");
const mongoose = require("./db/db");
const env = require("dotenv").config();
const app = express();
app.use(express.json());

app.use("/admin", require("./routes/adminRoutes"));
app.use("/teacher", require("./routes/teacherRoute"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("app running on port 8080");
});
