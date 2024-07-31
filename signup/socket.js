const WebSocket = require("ws");
const useCaseSuccessCheck = require("./usecase_success.json");
const useCaseFailedCheck = require("./usecase_failed.json");

// ENV: variable for switching between successful and failed liveness check
const testUseCaseSuccess = true;

const useCase = testUseCaseSuccess ? useCaseSuccessCheck : useCaseFailedCheck;

const parseStompMessage = (message) => {
  // Implement logic to parse STOMP message (command, headers, body)
  const lines = message.split("\n");
  const command = lines[0].split(" ")[0];
  const headers = {};
  for (let i = 1; i < lines.length - 1; i++) {
    const [key, value] = lines[i].split(":");
    if (key) {
      headers[key.trim()] = value?.trim();
    }
  }
  const body = lines[lines.length - 1];
  return { command, headers, body };
};

const createStompFrame = (command, headers = {}, body = "") => {
  // Implement logic to create a STOMP frame string
  let frame = `${command}`;
  for (const key in headers) {
    if (headers.hasOwnProperty(key)) {
      frame += `\n${key}: ${headers[key]}`;
    }
  }
  frame += "\n\n";
  if (body) {
    frame += body;
  }
  frame += "\0";
  return frame;
};

const connectedClients = {};

const sendFrame = (ws, destination, body) => {
  if (ws.readyState === WebSocket.OPEN) {
    console.log("Sending frame:", body);
    ws.send(
      createStompFrame(
        "MESSAGE",
        {
          destination,
          subscription: subscribeId,
          "content-type": "application/json",
          "content-length": body.length,
        },
        body
      )
    );
  }
};

const processFrame = (messageObj) => {
  const body = JSON.parse(messageObj.body.replace("\0", ""));
  console.log(body);

  const slotId = body.slotId;

  if (body.stepCode === "START") {
    const response = useCase.find(
      (_) => _.frameNumber === 0 && _.stepCode === body.stepCode
    );
    if (response) {
      sendFrame(
        connectedClients[slotId],
        `/topic/${slotId}`,
        JSON.stringify(response)
      );
    }
  }

  if (body.frames !== null && body.frames.length > 0) {
    console.log("inside if");
    body.frames.forEach((frame) => {
      const response = useCase.find(
        (_) => _.frameNumber === frame.order && _.stepCode === body.stepCode
      );
      if (response) {
        sendFrame(
          connectedClients[slotId],
          `/topic/${slotId}`,
          JSON.stringify(response)
        );
      }
    });
  }
};

let subscribeId = null;

const onSocketConnect = (ws, req) => {
  console.log("Client connected");
  const slotId = new URLSearchParams(req.url.split("?")[1]).get("slotId");
  console.log("Slot ID:", slotId);
  // Assign a unique ID to the client
  const clientId = Math.random().toString(36).substring(2, 7);
  connectedClients[slotId] = ws;

  ws.on("message", (message) => {
    const messageObj = parseStompMessage(message.toString()); // Parse incoming STOMP message

    if (messageObj.command === "CONNECT") {
      // Handle connection logic (e.g., send CONNECTED frame)
      ws.send(
        createStompFrame("CONNECTED", {
          version: "1.2",
          "heart-beat": "0,0",
          "user-name": slotId,
        })
      ); // Send CONNECTED frame with session ID
    } else if (messageObj.command === "SUBSCRIBE") {
      // Handle subscription logic (e.g., store subscription topic)
      console.log(
        `Client ${clientId} subscribed to topic: ${messageObj.headers.destination}`
      );
      subscribeId = messageObj.headers.id;
    } else if (messageObj.command === "MESSAGE") {
      // Handle subscription logic (e.g., store subscription topic)
      console.log(
        `Client ${clientId} subscribed to topic: ${messageObj.headers.destination}`
      );
    } else if (messageObj.command === "SEND") {
      // Handle publish logic (e.g., broadcast message to subscribed clients)

      const destination = messageObj.headers.destination;

      if (destination === "/v1/signup/ws/process-frame") {
        processFrame(messageObj);
      }
    } else {
      console.warn(`Unsupported STOMP command: ${messageObj.command}`);
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
    // Clean up client from connectedClients
    delete connectedClients[clientId];
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
};

module.exports = { onSocketConnect };
