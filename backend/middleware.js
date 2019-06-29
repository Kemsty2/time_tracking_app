const domain = require("domain");
const cluster = require("cluster");

let count = 0;

// (stackoverflow : https://gist.github.com/isaacs/5264418)
const domainMiddleWare = function(req, res, next) {
  let d = domain.create();

  d.id = domainMiddleWare.id(req);
  d.add(req);
  d.add(res);
  d.run(next);
  d.on("error", function(err) {
    console.error("error domain");

    try {
      const killtimer = setTimeout(function() {
        process.exit(1);
      }, 30000);
      // But don't keep the process open just for that!
      killtimer.unref();

      //    Send to master we are disconnect
      cluster.worker.disconnect();
      next(err);
    } catch (error) {
      console.error("error 500", error.stack);
    }
  });
};

domainMiddleWare.id = function(req) {
  return new Date().getTime() + count++;
};

exports.domainMiddleWare = domainMiddleWare;
// (stackoverflow : https://gist.github.com/isaacs/5264418)

const errorHandler = function(err, req, res, next) {
  try {
    let status = err.status || 500,
      message = err.message || "Interval Server Error";

    res.status(status).json({
      message: `${process.domain.id} with ${message}`
    });
  } catch (error) {
    console.error(error);
  }
};

exports.errorHandler = errorHandler;
