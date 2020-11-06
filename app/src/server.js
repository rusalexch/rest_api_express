const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');

const { APP_PORT: port } = process.env;
const db = require('./core/database');

const app = express();

app.get('/', (req, res) => {
  res.sendStatus(200)
});

db();

app.listen(port, () => {
  console.info(`Server runing at http://localhost:${port}`)
});