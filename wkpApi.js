const express = require("express");
const app = express();
const { File, validateFile } = require("./connectToDb");
const { path, winstonFunction, port } = require("./connectionparams");
const winston = require("winston");
winstonFunction();

app.use(express.urlencoded({ extended: true }));
//to read a reference of type JSON
app.use(express.json());

//  for create
async function creater(value) {
  const newFile = new File({
    fileName: value.fileName,
    price: value.price,
    data: value.data,
  });
  const savedFile = await newFile.save();
  return savedFile;
}

app
  .get(path(":request"), (req, res) => {
    res
      .status(404)
      .send(
        "you have to upload some data first \nby going to the post request section"
      );
  })
  .post(path(":paramData"), async (req, res) => {
    const data = req.params.paramData;
    const { error } = validateFile(req.body);
    //finder is returned array
    const finder = await File.find({
      fileName: data,
    });
    if (!finder)
      return res
        .status(404)
        .send("The file you are looking for does not exist");
    if (error) return res.status(400).send(error.details[0].message);

    if (
      finder[0].data == req.body.data &&
      finder[0].fileName == req.body.fileName
    ) {
      return res
        .status(400)
        .send(
          "The information you sent is available in the database!\nPlease try again"
        );
    } else {
      res
        .status(200)
        .send(
          "The information you sent has been saved in the database. The information you searched for is low" +
            "\n\n" +
            finder
        );

      await creater(req.body);
    }
  });

app.listen(port, () => {
  winston.info(`started to hear ${port}`);
});
