const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const fs = require("fs");
const path = require("path");
const DATA_FILE = path.join(__dirname, "data.json");

router.get("/timers", (req, res, next) => {
  try {
    fs.readFile(DATA_FILE, (err, data) => {
      res.setHeader("Cache-Control", "no-cache");
      res.json(JSON.parse(data));
    });
  } catch (error) {
    next(createError(500, "Internal Error"));
  }
});

router.get("/timers/:id", (req, res, next) => {
  try {
    console.log(req.params.id);
    fs.readFile(DATA_FILE, (err, data) => {
      const timers = JSON.parse(data);
      let myTimer;
      timers.some(timer => {
        if (timer.id === req.params.id) {
          return res.json(timer) && true;          
        }
      });
      res.json(myTimer);
    });
  } catch (error) {
    next(createError(500, "Internal Error"));
  }
});

router.post("/timers", (req, res, next) => {
  try {
    fs.readFile(DATA_FILE, (err, data) => {
      const timers = JSON.parse(data);
      const newTimer = {
        title: req.body.title,
        project: req.body.project,
        id: req.body.id,
        elapsed: 0,
        runningSince: null
      };
      timers.push(newTimer);
      fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 4), () => {
        res.setHeader("Cache-Control", "no-cache");
        res.json(timers);
      });
    });
  } catch (error) {
    next(createError(500, "Internal Error"));
  }
});

router.put("/timers/", (req, res, next) => {
  try {
    fs.readFile(DATA_FILE, (err, data) => {
      const timers = JSON.parse(data);
      timers.forEach(timer => {
        if (timer.id === req.body.id) {
          timer.title = req.body.title;
          timer.project = req.body.project;
        }
      });
      fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 4), () => {
        res.json({});
      });
    });
  } catch (error) {
    next(createError(500, "Internal Error"));
  }
});

router.delete("/timers/", (req, res, next) => {
  try {
    fs.readFile(DATA_FILE, (err, data) => {
      let timers = JSON.parse(data);
      timers = timers.reduce((memo, timer) => {
        if (timer.id === req.body.id) {
          return memo;
        } else {
          return memo.concat(timer);
        }
      }, []);
      fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 4), () => {
        res.json({});
      });
    });
  } catch (error) {
    next(createError(500, "Internal Error"));
  }
});

router.get("/timers/start-timer", (req, res, next) => {
  try {
    fs.readFile(DATA_FILE, (err, data) => {
      const timers = JSON.parse(data);
      timers.forEach(timer => {
        if (timer.id === req.body.id) {
          timer.runningSince = req.body.start;
        }
      });
      fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 4), () => {
        res.json({});
      });
    });
  } catch (error) {
    next(createError(500, "Internal Error"));
  }
});

router.get("/timers/stop-timer", (req, res, next) => {
  try {
    fs.readFile(DATA_FILE, (err, data) => {
      const timers = JSON.parse(data);
      timers.forEach(timer => {
        if (timer.id === req.body.id) {
          const delta = req.body.stop - timer.runningSince;
          timer.elapsed += delta;
          timer.runningSince = null;
        }
      });
      fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 4), () => {
        res.json({});
      });
    });
  } catch (error) {
    next(createError(500, "Internal Error"));
  }
});

module.exports = router;
