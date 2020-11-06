const express = require('express');
const db = require('./core/database');

const port = 3000;
const app = express();

app.get('/', (req, res) => {
  res.sendStatus(200)
});

db()

app.listen(port, () => {
  console.info(`Server runing at http://localhost:${port}`)
});