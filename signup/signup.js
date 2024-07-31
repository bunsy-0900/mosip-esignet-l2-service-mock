const express = require("express");
const signupRoute = express.Router();
// const WS = require("ws");

// const wss = new WS.WebSocketServer({server: WS.Server, path: "/ws"});

const currentTimestamp = () => new Date().toISOString();

const settingsResponse = require("./settings.json");
const status = require("./status.json");
const challenge = require("./challenge.json");
const verifyChallenge = require("./verifyChallenge.json");
const register = require("./register.json");
const kycProviderList = require("./kycProvidersList.json");
const termsAndConditions = require("./kyc_terms_condition.json");
const slot = require("./slot.json");

signupRoute.get("/settings", (req, res) => {
  settingsResponse.responseTime = currentTimestamp();
  res.send(settingsResponse);
});

signupRoute.get("/registration/status", (req, res) => {
  status.responseTime = currentTimestamp();
  res.send(status);
});

signupRoute.get("/registration/register", (req, res) => {
  register.responseTime = currentTimestamp();
  res.send(register);
});

signupRoute.post("/registration/generate-challenge", (req, res) => {
  challenge.responseTime = currentTimestamp();
  res.send(challenge);
});

signupRoute.post("/registration/verify-challenge", (req, res) => {
  verifyChallenge.responseTime = currentTimestamp();
  res.send(verifyChallenge);
});

signupRoute.post("/identity-verification/initiate", (req, res) => {
  kycProviderList.responseTime = currentTimestamp();
  res.send(kycProviderList);
});

signupRoute.get("/identity-verification/identity-verifier/:id", (req, res) => {
  res.send({
    responseTime: currentTimestamp(),
    errors: null,
    response: termsAndConditions[req.params.id],
  });
});

signupRoute.post("/identity-verification/slot", (req, res) => {
  slot.responseTime = currentTimestamp();
  setTimeout(() => {
    res.send(slot);
  }, 2000);
});

signupRoute.get("/identity-verification/status", (req, res) => {
  status.responseTime = currentTimestamp();
  status.response.status = "COMPLETED";
  // status.response.status = "FAILED";
  // status.response.status = "UPDATE_PENDING";
  setTimeout(() => {
    res.send(status);
  }, 5000);
});

// wss.on("connection", (ws) => {
//     ws.on('error', (error) => {
//         console.log("Error: ", error);
//     });
//     ws.on("message", (message) => {
//         console.log("Received message: ", message);
//     });
//     ws.send("Hello from server");
//     console.log("New connection established");
// })

module.exports = signupRoute;
