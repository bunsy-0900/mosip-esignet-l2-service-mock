const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server, {
//   cors: { origin: "*" },
//   path: "/v1/signup/identity-verification/ws",
// });

const port = 8088;
const { WebSocketServer } = require("ws");
const wss = new WebSocketServer({ server, path: "/v1/signup/ws" });

const signupRoute = require("./signup/signup");
const esignetRoute = require("./esignet/esignet");
const { onSocketConnect } = require("./signup/socket");

// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use("/v1/signup", signupRoute);

app.use("/v1/esignet", esignetRoute);

wss.on("connection", onSocketConnect);

server.listen(port, () => {
  console.log(`Mock Signup service running on port ${port}`);
});
