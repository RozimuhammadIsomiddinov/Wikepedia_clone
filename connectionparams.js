const winston = require("winston");

module.exports.port = process.env.PORT || 7001;
module.exports.winstonFunction = function () {
  winston.add(
    new winston.transports.File({ filename: "./winstonInfo/winstonLogger" })
  );
  winston.add(new winston.transports.Console());
};
module.exports.forDb = function (value) {
  return "mongodb://localhost/" + value;
};
module.exports.path = function (param) {
  return "/api/cloneWikipedia/" + param;
};
