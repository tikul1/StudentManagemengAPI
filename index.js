const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const YAML = require("yamljs");
const Joi = require("joi");

const creaateHmac = require("crypto");
const mongoose = require("./db/db");
require("dotenv").config();
const app = express();
app.use(express.json());

const schema = Joi.string().min(10);
schema.validateAsync("ghosdfsdfqw");

const schema2 = Joi.object().keys({
  a: Joi.string().empty("").default("default value").lowercase(), //or we can use required()
  b: Joi.number(), //.integer() .limit() .nagative()
  c: Joi.boolean(),
  d: Joi.string().domain().required(),
  e: Joi.string().token(),
});
schema2.validateAsync({
  a: "sadasASDASDd",
  b: 1231,
  c: true,
  d: "www.google.com",
});
const schema3 = Joi.object({
  a: Joi.array().items(Joi.number()),
  b: Joi.number().valid(Joi.in("a")), //used to give array vales
});
schema3.validateAsync({
  a: [3, 44123, 342, 1324],
  b: 44123,
});

Joi.attempt("21", Joi.number());
const result = Joi.attempt("4", Joi.number());
console.log({ result });

const schema4 = Joi.object({
  a: Joi.ref("b.c"),
  b: {
    c: Joi.any(),
  },
  c: Joi.ref("$x"),
});

schema4.validateAsync({ a: 5, b: { c: 5 } }, { c: { x: 5 } });

//define type so we dont have to use as as functions

const { object, string } = Joi.types();
const schema5 = object.keys({
  property: string.min(4),
});
const schema6 = Joi.object({
  a: Joi.number()
    .min(0)
    .error((errors) => new Error("requires a positive number")),
});
schema6.validateAsync({ a: 1 });
const schema7 = Joi.object({
  min: Joi.number(),
  max: Joi.number().when("min", {
    is: Joi.number().required(),
    then: Joi.number().greater(Joi.ref("min")),
  }),
});
schema7.validateAsync({
  min: 5,
  max: 6,
});

//array length and max and min values inside array
const schema8 = Joi.array().items(Joi.string(), Joi.number()).length(2).max(2).min(1).unique();
schema8.validateAsync([1, "ASdasd"]);

const schema9 = Joi.date().greater("1-1-1974"); // .less and .max and .min // .isoDate(), isoDuration()
const schema10 = Joi.date().greater("now"); //for current date

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
