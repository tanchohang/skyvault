import { createLogger, transports, format } from 'winston';
import { config } from '../config/index.js';

const devLogger = createLogger({
  level: 'debug',
  transports: [new transports.Console()],
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
});

const prodLogger = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/errors.log', level: 'error' }),
    new transports.File({ filename: 'logs/access.log', level: 'info' }),
  ],
  format: format.combine(format.timestamp(), format.errors({ stack: true }), format.json()),
});

const logger = config.env === 'development' ? devLogger : prodLogger;

export { logger };
