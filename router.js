const { File, validateFile } = require("./connectToDb");
const express = require("express");
const app1 = express();

var counter = 0;
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

app1
  .get("/:request", async (req, res) => {
    const finder = await File.find().select({ fileName: 1, _id: 0 });
    items = "";
    finder.forEach((item) => {
      items += item + "\n";
    });

    res.send(
      "You have now made an incorrect request\nWe will only show you the name of the data we have for now" +
        "\nLater you can get full details via post request\n\n" +
        items
    );
  })
  .post("/:paramData", async (req, res) => {
    const data = req.params.paramData;
    const { error } = validateFile(req.body);

    const findByDb = await File.find({
      fileName: req.body.fileName,
    });

    const findByParam = await File.find({
      fileName: data,
    });

    try {
      if (error) return res.status(400).send(error.details[0].message);

      if (findByDb.length === 0) {
        res
          .status(201)
          .send(
            "The information you sent has been saved in the database. The information you searched for is below" +
              "\n\n" +
              findByParam
          );

        await creater(req.body);
      } else if (
        findByDb[0].data === req.body.data &&
        findByDb[0].fileName === req.body.fileName
      ) {
        return res
          .status(400)
          .send(
            "The information you sent is available in the database! Please try again"
          );
      } else {
        return res
          .status(404)
          .send(
            "The information you sent does not match any existing data in the database"
          );
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Serverda Xatolik yuz berdi!");
    }
  });
module.exports = app1;
