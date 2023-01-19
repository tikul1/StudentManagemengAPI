const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const YAML = require("yamljs");
const mongoose = require("./db/db");
require("dotenv").config();
const cluster = require("cluster");
const totalCPUs = require("os").cpus().length;
const child_process = require("child_process");
const { fork } = require("child_process");
const childController = require("./childController");
const { date } = require("joi");
const { resolve } = require("path");
const app = express();
app.use(express.json());

// // Run a worker thread method to use in api's
// function runService(childController, workerData) {
//   return new Promise((resolve, reject) => {
//     const worker = child_process.fork(childController);

//     worker.on("message", function (message) {
//       if (message.ready) {
//         // worker is ready to receive data
//         worker.send(workerData);
//       } else {
//         // worker finished it's calculations, send the data to the client
//         resolve(message);
//       }
//     });

//     worker.on("error", function (x) {
//       console.log("error", x);
//       resolve({ status: 500 });
//     });
//     worker.on("close", function (y) {
//       console.log("close", y);
//     });
//     worker.on("exit", function (code) {
//       if (code == 0) {
//         console.log("report ran successfully");
//       } else {
//         console.log("report FAILED");
//         resolve({ status: 500 });
//       }
//     });
//   });
// }

app.use("/admin", require("./routes/adminRoutes"));
app.use("/teacher", require("./routes/teacherRoutes"));
app.use("/student", require("./routes/studentRoutes"));

//using child process to send message between parent and child process.

app.use("/message", async (req, res) => {
  const child = fork("childMessage.js");

  child.on("message", function (m) {
    console.log("Parent process received:", m);
  });

  child.send({ hello: "from parent process" });

  child.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
  res.json({});
});

//child prcoess with long computations.
const longComputation = require("./computation");
app.use("/computation", async (req, res) => {
  const sum = await longComputation();
  res.send({ sum: sum });
  const child = fork("computation.js");
  child.send("message");
});

//using child process in api to recieve data

app.use("/student2", async (req, res) => {
  const child = fork("childController.js");
  child.send({ time: Date.now() });
  child.on("message", (message) => {
    console.log(message);
    res.send({ message });
  });
  child.on("exit", (code) => {
    console.log("child died", code);
  });
  // res.json({});
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("app running on port 8080");
});

// const options = YAML.load("studentManagement.yml");
// const specs = swaggerJsDoc(options);
// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
