const mongoose = require("mongoose");
const winston = require("winston");
const { forDb } = require("./connectionparams");
const Joi = require("joi");

mongoose
  .connect(forDb("wkpcData"))
  .then(() => {
    winston.info("successfully connected to mongodb");
  })
  .catch((er) => {
    winston.error("a connection error occurred");
  });

const fileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
    min: 5,
  },
  //musted for assessment
  price: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5],
  },
  // information in the file
  data: {
    type: String,
    required: true,
    min: 15,
  },
});

const File = mongoose.model("File", fileSchema);

function validateFile(value) {
  const validated = Joi.object({
    fileName: Joi.string().required().min(5),
    price: Joi.number().required().equal(1, 2, 3, 4, 5),
    data: Joi.string().required().min(15),
  });
  return validated.validate(value);
}
module.exports = {
  File,
  validateFile,
};
