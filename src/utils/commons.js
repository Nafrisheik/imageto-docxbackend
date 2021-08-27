const { MESSAGES } = require('./constants');

const entryLog = (req) => {
  return strFormat(MESSAGES.METHOD_ACCESS, req.method, req.path, (new Date()).getTime(), req.connection.remoteAddress);
};

const strFormat = function(format) {
  var args = Array.prototype.slice.call(arguments, 1);
  return format.replace(/{(\d+)}/g, function(match, number) { 
    return typeof args[number] != 'undefined'
      ? args[number] 
      : match
    ;
  });
};

const parseBoolean = (value) => {
  if (value) {
    switch (typeof value) {
      case "string":
        return value.toLowerCase() === "true" ? true : false;
      case "boolean":
        return value;
      case "number":
        return value === 0 ? false : true;
      default:
        return false;

    }
  }

  return false;
}

module.exports = {
  entryLog,
  strFormat,
  parseBoolean
}