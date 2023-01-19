const { execFile } = require("child_process");

execFile("./index.js", (error, stdout, stderr) => {
  if (error) {
    console.log(`error : ${error}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
  }
  console.log(`stdout: ${stdout}`);
});
