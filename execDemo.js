const { exec } = require("child_process");

exec(`dir`, (error, stdout, stderr) => {
  if (error) {
    console.log(`error : ${error}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
  }
  console.log(`stdout: ${stdout}`);
});
