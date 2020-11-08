const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const logger = require('./core/config/winston');

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: `${process.cwd()}/.test.env` });
} else {
  dotenv.config({ path: `${process.cwd()}/.env` });
}

const modules = require('./modules');

const { APP_PORT: port } = process.env;

const app = express();
app.use(cors());
app.use(bodyParser.json());
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined', { stream: logger.stream }));
}
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
}));
app.use(bodyParser.urlencoded({ extended: false }));

modules(app);

app.get('/', (req, res) => {
  res.sendStatus(200);
});

const server = app.listen(port, () => {
  logger.log('info', `Server runing at http://localhost:${port}`);
});

module.exports = server;
