const http = require("http");
const cluster = require("cluster");
const app = require("./app");
const fs = require("fs");
const path = require("path");

const port = normalizePort(process.env.PORT || 3000);
const numCpus = require("os").cpus().length;

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

if (cluster.isMaster) {
  for (let i = 0; i < numCpus; i++) {
    let worker = cluster.fork();
    worker.on("message", function() {
      console.log("arguments", arguments);
    });
  }

  /* const dirents = fs.readdirSync(path.join(__dirname), { withFileTypes: true });
  dirents
    .filter(dirent => !dirent.isDirectory())
    .forEach(dirent => {
      console.log(dirent);
      fs.watch(path.join(__dirname, dirent.name), function() {
        restartWorkers();
      });
    }); */

  cluster.on("online", function(worker) {
    console.log("Worker " + worker.process.pid + " is online");
  });

  cluster.on("exit", function(worker, code, signal) {
    console.log(
      "Worker " +
        worker.process.pid +
        " died with code: " +
        code +
        ", and signal: " +
        signal
    );
    console.log("Starting a new worker");
    let _worker = cluster.fork();

    _worker.on("message", function() {
      console.log("arguments", arguments);
    });
  });

  cluster.on("disconnect", () => {
    console.error("disconnect !❌");
  });
} else {
  let server;

  server = http.createServer(app).listen(port);

  server.on("error", onError);

  server.on("listening", () => {
    onListening(server);
  });

  server.on("close", () => {
    console.log("Server closed");
  });

  process.on("message", function(message) {
    if (message.text === "shutdown") {
      process.exit(0);
    }
  });
}

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

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
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

/**
 * Event listener for HTTP server "listening" event.
 */

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
