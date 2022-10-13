const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const YAML = require("yamljs");
const creaateHmac = require("crypto");
const mongoose = require("./db/db");
require("dotenv").config();
const app = express();
app.use(express.json());

app.use("/admin", require("./routes/adminRoutes"));
app.use("/teacher", require("./routes/teacherRoutes"));
app.use("/student", require("./routes/studentRoutes"));

// /*
//       CRYPTO ENCRYPTION
// */
// const password = "Hardik@123";
// // const cipher = crypto.createCipher("aes128", "hey");
// const encrypted = createHmac("sha256", secret).update("I love cupcakes").digest("hex");
// console.log({ encrypted });
// // encrypted += cipher.final("hex");
// console.log(encrypted);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("app running on port 8080");
});

const options = YAML.load("studentManagement.yml");
const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
