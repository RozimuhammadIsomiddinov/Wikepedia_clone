const express = require("express");
const app = express();
const { path, winstonFunction, port } = require("./connectionparams");
const winston = require("winston");
const app1 = require("./router");
winstonFunction();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(path(), app1);

app.listen(port, () => {
  winston.info(`started to hear ${port}`);
});
