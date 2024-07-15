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
const { WebSocketServer } = require('ws');
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

// const wsServer = new WS.Server({ noServer: true, path: "/v1/signup/identity-verification/ws" });
// io.on("connection", (socket) => {
//   // message event
//   socket.on("message", (message) => {
//     console.log(`Received message => ${message}`);
//     socket.send(`Received message => ${message}`);
//   });

//   //on disconnect
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
//   // on error
//   socket.on("error", (error) => {
//     console.log(`Error: ${error}`);
//   });
//   // process-frame event
//   socket.on("/process-frame", (data) => {
//     const res = {
//       slotId: data.request.slotId,
//       step: {
//         code: data.request.stepCode,
//         framesPerSecond: 20,
//         durationInSeconds: 200,
//         startupDelayInSeconds: 4,
//         retryOnTimeout: false,
//         retryableErrorCodes: [],
//       },
//       feedback: { type: "", code: "" },
//     };
//     console.log("Getting request data from ui: ", JSON.stringify(data));
//     socket.emit("/ws", res);
//     // setTimeout(() => {
//     //   res.step.code = 1;
//     //   socket.emit("/ws", res);
//     // }, res.step.startupDelayInSeconds * 1000);
//     // switch (key) {
//     //   case value:

//     //     break;

//     //   default:
//     //     break;
//     // }
//   });

//   socket.on("/v1/signup/ws/process-frame", (data) => {
//     console.log("Getting request data from ui: ", JSON.stringify(data));
//     socket.emit("/topic/greetings", data)
//   })

//   // on connected
//   console.log("Client connected");
//   // socket.emit("/process-frame", "Welcome to the signup service");
// });

wss.on("connection", onSocketConnect);

server.listen(port, () => {
  console.log(`Mock Signup service running on port ${port}`);
});
