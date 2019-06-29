const cluster = require("cluster");
const fs = require("fs");
const path = require("path");

const restartWorkers = function restartWorkers() {
  console.log(`\x1b[32mRestarting all the worker\x1b[0m`);

  let wid,
    workerIds = [];

  // create a copy of current running worker ids
  for (wid in cluster.workers) {
    if (cluster.workers[wid]) {
      workerIds.push(wid);
    }
  }

  workerIds.forEach(function(wid) {
    cluster.workers[wid].send({
      text: "shutdown",
      from: "master"
    });

    setTimeout(function() {
      if (cluster.workers[wid]) {
        cluster.workers[wid].kill("SIGKILL");
      }
    }, 5000);
  });
};

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error, port) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(server) {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log(
    `\x1b[32mProcess ${
      process.pid
    } is listening to all incoming requests\x1b[0m`
  );
  console.log(`\x1b[32m${bind}\x1b[0m`);
}

function watch() {
  const dirents = fs.readdirSync(path.join(__dirname), { withFileTypes: true });
  dirents
    .filter(dirent => !dirent.isDirectory())
    .forEach(dirent => {
      console.log(dirent);
      fs.watch(path.join(__dirname, dirent.name), function() {
        restartWorkers();
      });
    });
}

exports.restartWorkers = restartWorkers;
exports.normalizePort = normalizePort;
exports.onError = onError;
exports.onListening = onListening;
exports.watch = watch;
