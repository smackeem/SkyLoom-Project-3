const express = require("express");
const router = express.Router();
const { auth } = require("express-oauth2-jwt-bearer");
const { AUTH_ISSUER_BASE_URL, AUTH_AUDIENCE, AUTH_TOKEN_SIGN } = process.env;

const flightCtrl = require("../controllers/flight");

const jwtCheck = auth({
  audience: AUTH_AUDIENCE,
  issuerBaseURL: AUTH_ISSUER_BASE_URL,
  tokenSigningAlg: AUTH_TOKEN_SIGN,
});

router.use(jwtCheck);
/////////////////////////////
///////Protected routes/////
///////////////////////////
router.get("/saved", flightCtrl.index);

router.post("/", flightCtrl.create);

router.delete("/:id", flightCtrl.delete);

module.exports = router;
