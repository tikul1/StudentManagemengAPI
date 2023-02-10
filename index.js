const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const YAML = require("yamljs");
const mongoDBConnection = require("./db/db");
require("dotenv").config();
const cluster = require("cluster");
const totalCPUs = require("os").cpus().length;
const http = require("http");
const fs = require("fs");
const app = express();
app.use(express.json());

//dev branch
//hello

//using cluster for multithreading

// if (cluster.isMaster) {
//   console.log(`Number of CPUs is ${totalCPUs}`);
//   console.log(`Master ${process.pid} is runsadasning`);
//   console.log("hello");
//   // Fork workers.
//   for (let i = 0; i < totalCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on("exit", (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} died`);
//     cluster.fork();
//   });
// } else {
//   const app = express();
//   app.use(express.json());

//   console.log(`Worker ${process.pid} started`);

//   app.use("/admin", require("./routes/adminRoutes"));
//   app.use("/teacher", require("./routes/teacherRoutes"));
//   app.use("/student", require("./routes/studentRoutes"));

//   const PORT = process.env.PORT;
//   // app.listen(PORT, () => {
//   //   console.log("app running on port 8080");
//   // });

//   https.createServer(app).listen(PORT, function () {
//     mongoDBConnection();
//     console.log(`Server started on port ${PORT}`);
//   });

//   const options = YAML.load("studentManagement.yml");
//   const specs = swaggerJsDoc(options);
//   app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
// }
app.use("/test", (req, res) => {
  res.send("hello");
});

app.use("/admin", require("./routes/adminRoutes"));
app.use("/teacher", require("./routes/teacherRoutes"));
app.use("/student", require("./routes/studentRoutes"));

const PORT = process.env.PORT;

//while using local db

// app.listen(PORT, () => {
//   console.log("app running on port 8080");
// });

//while using cluster db

http.createServer(app).listen(PORT, function () {
  mongoDBConnection();
  console.log(`Server started on port ${PORT}...`);
});

const options = YAML.load("studentManagement.yml");
const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

//if uploads folder is not available
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}
