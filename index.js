const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const YAML = require("yamljs");
const mongoose = require("./db/db");
const env = require("dotenv").config();
const app = express();
const { invalidPathHandler } = require("./helpers/apiError");
app.use(express.json());

app.use("/admin", require("./routes/adminRoutes"));
app.use("/teacher", require("./routes/teacherRoutes"));
app.use("/student", require("./routes/studentRoutes"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("app running on port 8080");
});

const options = YAML.load("studentManagement.yml");
const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(invalidPathHandler);
