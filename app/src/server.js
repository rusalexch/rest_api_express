const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const winston = require('./core/config/winston');
const modules = require('./modules');

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: `${process.cwd()}/.test.env` });
} else {
  dotenv.config();
}

const { APP_PORT: port } = process.env;

const app = express();
app.use(cors());
app.use(bodyParser.json());
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined', { stream: winston.stream }));
}

app.get('/', (req, res) => {
  res.sendStatus(200);
});

modules(app);

const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server runing at http://localhost:${port}`);
});

module.exports = server;
