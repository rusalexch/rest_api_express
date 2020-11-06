const express = require('express');

const port = 3000;
const app = express();

app.get('/', (req, res) => {
  res.sendStatus(200)
});

app.listen(port, () => {
  console.info(`Server runing at http://localhost:${port}`)
});