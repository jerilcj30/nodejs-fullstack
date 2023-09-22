const { createLogger, format, transports } = require('winston');

module.exports = createLogger({
  transports: [
    new transports.File({
      filename: 'logs/access.log',
      level: 'info',
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});
