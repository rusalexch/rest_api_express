const winston = require('winston');

const {
  printf, combine, timestamp, colorize,
} = winston.format;

const options = {
  file: {
    level: 'info',
    filename: `${process.cwd()}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const myFormat = printf(({
  level, message, timestamp: time,
}) => `[${level} : ${time}] \n\t${message}`);

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  format: combine(
    colorize(),
    timestamp(),
    myFormat,
  ),
  exitOnError: false,
});

logger.stream = {
  // eslint-disable-next-line no-unused-vars
  write: (message, _encoding) => {
    logger.info(message);
  },
};

module.exports = logger;
