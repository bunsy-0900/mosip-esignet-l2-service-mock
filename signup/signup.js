const express = require("express");
const signupRoute = express.Router();
// const WS = require("ws");

// const wss = new WS.WebSocketServer({server: WS.Server, path: "/ws"});

const TIMEOUT = 2_500;

const currentTimestamp = () => new Date().toISOString();

const settingsResponse = require("./settings.json");
const challenge = require("./challenge.json");
const register = require("./register.json");
const kycProviderList = require("./kycProvidersList.json");
const termsAndConditions = require("./kyc_terms_condition.json");
const slot = require("./slot.json");

// SECTION: verify challenge endpoint section
const verifyChallengeSuccess = require("./registration/verifyChallenge/verifyChallenge_success.json");

// SECTION: registration register status section
const registerStatusCompleted = require("./registration/status/status_completed.json");
const registerStatusFailed = require("./registration/status/status_failed.json");
const registerStatusPending = require("./registration/status/status_pending.json");
const registerStatusUnknownError = require("./registration/status/status_unknown_error.json");
const registerStatusInvalidTransaction = require("./registration/status/status_invalid_transaction.json");

// SECTION: reset password status section
const resetPassCompleted = require("./resetPassword/status/status_succ_completed.json");
const resetPassPending = require("./resetPassword/status/status_succ_pending.json");
const resetPassUnknownError = require("./resetPassword/status/status_err_unknown_err.json");
const resetPassInvalidTransaction = require("./resetPassword/status/status_err_invalid_transaction.json");
const resetPassInvalidRequest = require("./resetPassword/status/status_err_invalid_request.json");

// SECTION: L2 Statuses section
const statusCompleted = require("./l2/status/status_completed.json");
const statusFailed = require("./l2/status/status_failed.json");
const statusUpdatePending = require("./l2/status/status_update_pending.json");
const statusInvalidTransaction = require("./l2/status/status_invalid_transaction.json");
const statusUnknownError = require("./l2/status/status_unknown_error.json");

signupRoute.get("/settings", (req, res) => {
  settingsResponse.responseTime = currentTimestamp();

  // NOTE: Config Changes
  settingsResponse.response.configs["status.request.retry.error.codes"] =
    "unknown_error";

  res.send(settingsResponse);
});

signupRoute.get("/registration/status", (req, res) => {
  // change to current timestamp
  registerStatusCompleted.responseTime = currentTimestamp();
  registerStatusFailed.responseTime = currentTimestamp();
  registerStatusPending.responseTime = currentTimestamp();
  registerStatusUnknownError.responseTime = currentTimestamp();
  registerStatusInvalidTransaction.responseTime = currentTimestamp();

  setTimeout(() => {
    /**
     * USE CASE: COMPLETED
     */
    // res.send(registerStatusCompleted);

    /**
     * USE CASE: FAILED
     */
    // res.send(registerStatusFailed);

    /**
     * USE CASE: PENDING
     * - retriable status
     */
    // res.send(registerStatusPending);

    /**
     * USE CASE: UNKNOWN_ERROR
     * - retriable error code
     */
    res.send(registerStatusUnknownError);

    /**
     * USE CASE: INVALID_TRANSACTION
     */
    // res.send(registerStatusInvalidTransaction);
  }, TIMEOUT);
});

signupRoute.post("/registration/register", (req, res) => {
  register.responseTime = currentTimestamp();
  res.send(register);
});

signupRoute.post("/registration/generate-challenge", (req, res) => {
  challenge.responseTime = currentTimestamp();
  res.send(challenge);
});

signupRoute.post("/registration/verify-challenge", (req, res) => {
  verifyChallengeSuccess.responseTime = currentTimestamp();
  res.send(verifyChallengeSuccess);
});

signupRoute.post("/reset-password", (req, res) => {
  // change to current timestamp
  resetPassCompleted.responseTime = currentTimestamp();
  resetPassPending.responseTime = currentTimestamp();
  resetPassUnknownError.responseTime = currentTimestamp();
  resetPassInvalidRequest.responseTime = currentTimestamp();
  resetPassInvalidTransaction.responseTime = currentTimestamp();

  setTimeout(() => {
    /**
     * USE CASE: COMPLETED
     */
    // res.send(resetPassCompleted);

    /**
     * USE CASE: PENDING
     * - retriable status
     */
    res.send(resetPassPending);

    /**
     * USE CASE: UNKNOWN_ERROR
     */
    // res.send(resetPassUnknownError);

    /**
     * USE CASE: INVALID_TRANSACTION
     * - retriable - by changing config in "/registration/status"
     */
    // res.send(resetPassInvalidTransaction);
  }, TIMEOUT);
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
  // change to current timestamp
  statusCompleted.responseTime = currentTimestamp();
  statusFailed.responseTime = currentTimestamp();
  statusUpdatePending.responseTime = currentTimestamp();
  statusUnknownError.responseTime = currentTimestamp();
  statusInvalidTransaction.responseTime = currentTimestamp();

  setTimeout(() => {
    /**
     * USE CASE: COMPLETED
     */
    // res.send(statusCompleted);

    /**
     * USE CASE: FAILED
     */
    // res.send(statusFailed);

    /**
     * USE CASE: UPDATE_PENDING
     * - retriable status
     */
    res.send(statusUpdatePending);

    /**
     * USE CASE: UNKNOWN_ERROR
     * - retriable error code
     */
    // res.send(statusUnknownError);

    /**
     * USE CASE: INVALID_TRANSACTION
     */
    // res.send(statusInvalidTransaction);
  }, TIMEOUT);
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
