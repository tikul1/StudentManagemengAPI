const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const YAML = require("yamljs");
const mongoose = require("./db/db");
require("dotenv").config();
const cluster = require("cluster");
const totalCPUs = require("os").cpus().length;
// const app = express();
// app.use(express.json());

if (cluster.isMaster) {
  console.log(`Number of CPUs is ${totalCPUs}`);
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Let's fork another worker!");
    cluster.fork();
  });
} else {
  const app = express();
  app.use(express.json());

  console.log(`Worker ${process.pid} started`);

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
}

// app.use("/admin", require("./routes/adminRoutes"));
// app.use("/teacher", require("./routes/teacherRoutes"));
// app.use("/student", require("./routes/studentRoutes"));

// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log("app running on port 8080");
// });

// const options = YAML.load("studentManagement.yml");
// const specs = swaggerJsDoc(options);
// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
