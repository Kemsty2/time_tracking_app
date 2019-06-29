const http = require("http");
const app = require("./app");
const { normalizePort, onError, onListening } = require("./utils");

const port = normalizePort(process.env.PORT || 3000);

let server = http.createServer(app);

server.listen(port);

server.on("error", err => {
  onError(err, port);
});

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
