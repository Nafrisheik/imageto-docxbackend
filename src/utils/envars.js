require('dotenv').config();

const {
  NODE_ENV,
  SERVER_PORT,
  LOGGING_FILE = false,
  LOGGING_FILE_PREFIX = "app",
  LOGGING_PERIOD,
  LOGGING_COUNT
} = process.env || {};

const environmentConfig = {
  NODE_ENV,
  SERVER_PORT,
  LOGGING_FILE,
  LOGGING_FILE_PREFIX,
  LOGGING_PERIOD,
  LOGGING_COUNT
};

module.exports = environmentConfig;