const { spawn } = require("child_process");

const child = spawn("dir", ["D:Test"], { shell: true });

child.stdout.on("data", (data) => {
  console.log({ data });
});
child.stderr.on("data", (data) => {
  console.log({ data });
});
child.on("error", (error) => {
  console.log({ error });
});

child.on("exit", (code, signal) => {
  if (code) console.log(`prcoess exited with code: ${code}`);
  if (signal) console.log(`process killed with signal: ${signal}`);
  console.log("done");
});
