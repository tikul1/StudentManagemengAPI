const students = require("./models/studentModel");
process.on("message", (message) => {
  console.log({ message });
  const result = list();
  process.send(result);
  // process.exit(1);
  setTimeout()(process.exit, 5000);
});
console.log("child created ", process.pid);

async function list() {
  let x = await students.find().populate("teacher_id", "_id firstname lastname");
  console.log({ x });
  return x;
}
let x = list();
console.log(x);
