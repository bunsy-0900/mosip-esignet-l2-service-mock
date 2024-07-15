const express = require("express");
const esignetRoute = express.Router();
const {SignJWT} = require("jose")

const currentTimestamp = () => (new Date()).toISOString();

// const timeValue = ()
const oAuthDetailResponse = require("./oauth-details.json");
const claimsDetailResponse = require("./claims-details.json");


esignetRoute.post("/authorization/v2/oauth-details", (req, res) => {
    oAuthDetailResponse.responseTime = currentTimestamp();
    res.send(oAuthDetailResponse);
})

esignetRoute.get("/csrf/token", (req, res) => {
    res.send({
        "token": "d681ea3b-9d7e-4d28-8d62-6b83e98023d7",
        "parameterName": "_csrf",
        "headerName": "X-XSRF-TOKEN"
    });
})

esignetRoute.post("/authorization/v2/authenticate", (req, res) => {
    res.send({
        "responseTime": currentTimestamp(),
        "response": {
            "transactionId": "HB4xlBhqYVSMfIpQyxe1eMnAa9e6COoQbHZeKehrQRU",
            "consentAction": "CAPTURE"
        },
        "errors": []
    })
})

esignetRoute.get("/authorization/claim-details", (req, res) => {
    claimsDetailResponse.responseTime = currentTimestamp();
    res.send(claimsDetailResponse);
})

esignetRoute.post("/authorization/prepare-signup-redirect", async (req, res) => {
    const idToken = await new SignJWT({
            "sub": "a111fc48-ba6b-4fc7-b4f9-dfc41ae0a9c7",
            "aud": "wdkYcW7JxxLWmrEhL8WxMOveBeHn1Ky_OCr4pmrM_TA",
            "acr": "mosip:idp:acr:static-code",
            "auth_time": 1718180767,
            "iss": "https://esignet-l2.camdgc-dev1.mosip.net/v1/esignet",
            "exp": 1718180951,
            "iat": 1718180771,
            "nonce": "ere973eieljznge2311"
    })
    res.send({
        "responseTime": currentTimestamp(),
        "response": {
            "transactionId": "HB4xlBhqYVSMfIpQyxe1eMnAa9e6COoQbHZeKehrQRU",
            "idToken": "eyJraWQiOiJTTmhFQlJCS1R5eHNOdDJiME1KQmFFUk9GUEtXSGlFdk5UdVhUdmhfaFU0IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJhMTExZmM0OC1iYTZiLTRmYzctYjRmOS1kZmM0MWFlMGE5YzciLCJhdWQiOiJ3ZGtZY1c3Snh4TFdtckVoTDhXeE1PdmVCZUhuMUt5X09DcjRwbXJNX1RBIiwiYWNyIjoibW9zaXA6aWRwOmFjcjpzdGF0aWMtY29kZSIsImF1dGhfdGltZSI6MTcxODE4MDc2NywiaXNzIjoiaHR0cHM6XC9cL2VzaWduZXQtbDIuY2FtZGdjLWRldjEubW9zaXAubmV0XC92MVwvZXNpZ25ldCIsImV4cCI6MTcxODE4MDk1MSwiaWF0IjoxNzE4MTgwNzcxLCJub25jZSI6ImVyZTk3M2VpZWxqem5nZTIzMTEifQ.QaF8rzlj99EEOzgb7yBpxm_3IJBBQGxGrsRqqDJ81Kq4ZlzFYsCurVHdXvxuPE09TslRRHcOm38Oxf8RhYskwb2cqjocAa5se_trf62rJZryyochzGxLgRjKiSJKJGmbm2jp97_n4H2BR53DGS95-SPrxfWagBxluat1NX7dgoCXApB1i38eSODpjD1Pfe3e_XoFNyOM-JsLLHBt3AqI7jAwykT7JWa2TuxZaYGj40Rroi3sOlK72-mS3E_lgFB4ijvcbc3usik1ztXZza4XbuBXMfNz10T0TZRMgC6apcXlZzl7SDxVS-JJ0t5vIcHgOJoL-z-xV4vkxiIlmLOAeg"
        },
        "errors": []
    })
})

esignetRoute.get("/.well-known/openid-configuration", async (req,res) => {
    res.send({
        "issuer": "https://esignet-l2.camdgc-dev1.mosip.net/v1/esignet",
    });
})


module.exports = esignetRoute;