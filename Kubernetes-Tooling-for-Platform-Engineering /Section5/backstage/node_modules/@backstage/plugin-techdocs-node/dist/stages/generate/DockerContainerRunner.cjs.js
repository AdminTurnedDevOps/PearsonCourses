'use strict';

var Docker = require('dockerode');
var fs = require('fs-extra');
var errors = require('@backstage/errors');
var stream = require('stream');
var util = require('util');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var Docker__default = /*#__PURE__*/_interopDefaultCompat(Docker);
var fs__default = /*#__PURE__*/_interopDefaultCompat(fs);

const pipeline = util.promisify(stream.pipeline);
class DockerContainerRunner {
  dockerClient;
  constructor() {
    this.dockerClient = new Docker__default.default();
  }
  async runContainer(options) {
    const {
      imageName,
      command,
      args,
      logStream = new stream.PassThrough(),
      mountDirs = {},
      workingDir,
      envVars = {},
      pullImage = true,
      defaultUser = false
    } = options;
    try {
      await this.dockerClient.ping();
    } catch (e) {
      throw new errors.ForwardedError(
        "This operation requires Docker. Docker does not appear to be available. Docker.ping() failed with",
        e
      );
    }
    if (pullImage) {
      await new Promise((resolve, reject) => {
        this.dockerClient.pull(imageName, {}, (err, stream) => {
          if (err) {
            reject(err);
          } else if (!stream) {
            reject(
              new Error(
                "Unexpeected error: no stream returned from Docker while pulling image"
              )
            );
          } else {
            pipeline(stream, logStream, { end: false }).then(resolve).catch(reject);
          }
        });
      });
    }
    const userOptions = {};
    if (!defaultUser && process.getuid && process.getgid) {
      userOptions.User = `${process.getuid()}:${process.getgid()}`;
    }
    const Volumes = {};
    for (const containerDir of Object.values(mountDirs)) {
      Volumes[containerDir] = {};
    }
    const Binds = [];
    for (const [hostDir, containerDir] of Object.entries(mountDirs)) {
      const realHostDir = await fs__default.default.realpath(hostDir);
      Binds.push(`${realHostDir}:${containerDir}`);
    }
    const Env = new Array();
    for (const [key, value] of Object.entries(envVars)) {
      Env.push(`${key}=${value}`);
    }
    const [{ Error: error, StatusCode: statusCode }] = await this.dockerClient.run(imageName, args, logStream, {
      Volumes,
      HostConfig: {
        AutoRemove: true,
        Binds
      },
      ...workingDir ? { WorkingDir: workingDir } : {},
      Entrypoint: command,
      Env,
      ...userOptions
    });
    if (error) {
      throw new Error(
        `Docker failed to run with the following error message: ${error}`
      );
    }
    if (statusCode !== 0) {
      throw new Error(
        `Docker container returned a non-zero exit code (${statusCode})`
      );
    }
  }
}

exports.DockerContainerRunner = DockerContainerRunner;
//# sourceMappingURL=DockerContainerRunner.cjs.js.map
