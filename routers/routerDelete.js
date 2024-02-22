const { File, validateSenderName } = require("../connectToDb");
const express = require("express");
const app2 = express();
const jwt = require("jsonwebtoken");
const middlewareToken = require("../middlewares/auth");

async function finder(senderName) {
  const finded = await File.find({ senderName: senderName });
  return finded[0];
}
app2
  .post("/", async (req, res) => {
    const { error } = validateSenderName(req.body);
    if (error) return res.status(401).send(error.details[0].message);
    const user = await finder(req.body.senderName);
    if (!user) return res.status(400).send("Bazada mavjud emas");
    const token = jwt.sign({ id: user._id }, "parol777");
    res.header("x-auth-clener-token", token).send(true);
  })
  .delete("/:deleteFile", middlewareToken, async (req, res) => {
    const { error } = validateSenderName(req.body);
    if (error) return res.status(401).send(error.details[0].message);
    const paramDelete = await File.find({ fileName: req.params.deleteFile }); //array qaytaradi
    if (paramDelete[0].senderName != req.body.senderName)
      return res.status(400).send("Siz so'rovda xato qildingiz!");

    await File.deleteOne({ fileName: paramDelete[0].fileName });
    res.status(200).send("Muvaffaqqiyatli o'chirish");
  });
module.exports = app2;
