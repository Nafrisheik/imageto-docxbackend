const bunyan = require('bunyan');
const path = require('path');
const env = require('./envars');
const { parseBoolean } = require('./commons');

const streams = [{
    stream: process.stdout
}];

if (parseBoolean(env.LOGGING_FILE)) {
    streams.push({
        type: 'rotating-file',
        path: path.resolve(process.cwd(), "_logs/" + env.LOGGING_FILE_PREFIX + "-" + (new Date()).getTime() + ".log"),
        period: env.LOGGING_PERIOD,
        count: parseInt(env.LOGGING_COUNT)
    });
}

const logger = bunyan.createLogger({
    name: 'leotrack',
    streams
});

module.exports = logger;