const cluster = require("cluster");
const numCpus = require("os").cpus().length;
const { watch } = require("./utils");

cluster.setupMaster({
  exec: __dirname + "/server.js"
});

//  Fork Worker
for (let i = 0; i < numCpus; i++) {
  cluster.fork();
}

process.env.NODE_ENV === "production"
  ? watch()
  : (function() {
      return;
    })();

cluster.on("disconnect", () => {
  console.error("disconnect !❌");
});

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
  let _worker = cluster.fork();

  _worker.on("message", function() {
    console.log("arguments", arguments);
  });
});
