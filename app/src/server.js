require('dotenv').config();
const express = require('express');
const cors = require('cors');
const user = require('./modules/users/index');
const bodyParser = require('body-parser');

const { APP_PORT: port } = process.env;
const db = require('./core/database');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendStatus(200)
});

user(db.clien);

app.listen(port, () => {
  console.info(`Server runing at http://localhost:${port}`)
});