const express = require('express');
const router = express.Router();

const flightCtrl = require('../controllers/flight');

router.get('/', flightCtrl.index);
