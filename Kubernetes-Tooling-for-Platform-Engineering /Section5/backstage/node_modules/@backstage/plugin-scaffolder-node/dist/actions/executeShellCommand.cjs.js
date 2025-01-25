'use strict';

var child_process = require('child_process');
var stream = require('stream');

async function executeShellCommand(options) {
  const {
    command,
    args,
    options: spawnOptions,
    logStream = new stream.PassThrough()
  } = options;
  await new Promise((resolve, reject) => {
    const process = child_process.spawn(command, args, spawnOptions);
    process.stdout.on("data", (stream) => {
      logStream.write(stream);
    });
    process.stderr.on("data", (stream) => {
      logStream.write(stream);
    });
    process.on("error", (error) => {
      return reject(error);
    });
    process.on("close", (code) => {
      if (code !== 0) {
        return reject(
          new Error(`Command ${command} failed, exit code: ${code}`)
        );
      }
      return resolve();
    });
  });
}

exports.executeShellCommand = executeShellCommand;
//# sourceMappingURL=executeShellCommand.cjs.js.map
