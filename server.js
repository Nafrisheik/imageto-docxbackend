const dotenvConf = require('dotenv').config();
const logger = require('./src/utils/logger');
const env = require('./src/utils/envars');
const app = require('./src/app');
const PORT = env.SERVER_PORT || 3000;

logger.info(`Starting application :: environment : ${env.NODE_ENV}`);

if (dotenvConf.error) {
  logger.error(dotenvConf.error);
  throw new Error("Failed to configure application");
}
//use ipv4
app.listen(PORT, '0.0.0.0', () => {
  logger.info(`Application is now listening on port ${PORT}`);
})

