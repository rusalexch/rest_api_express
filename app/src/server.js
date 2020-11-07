require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const winston = require('./core/config/winston');
const user = require('./modules/users/index');

const { APP_PORT: port } = process.env;
const db = require('./core/database');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined', { stream: winston.stream }));

app.get('/', (req, res) => {
  res.sendStatus(200);
});

user(db.clien, app);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  winston.log('info', `Server runing at http://localhost:${port}`);
});
