const express = require('express');
const cors = require('cors');
const compression = require('compression');
const fileUpload = require('express-fileupload');
const routes = require('./api');

const app = express();
app.use("*", cors({ allowedHeaders: ['Content-Type', 'Accept']}));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(fileUpload());

app.use(routes);

module.exports = app;



