const express = require("express");
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require("dotenv").config();
require('./config/database');

const flightRouter = require('./routers/flightRoutes');
const amadeusAPIRouter = require('./routers/amadeus');

const {PORT} = process.env;

app.get('/', (req, res)=> {
    res.send("Hello world");
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(morgan("dev"));

app.use('/flights', flightRouter);
app.use('/', amadeusAPIRouter);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));