const { Categories } = require("../config/old/category");
const winston = require("winston");

winston.add(new winston.transports.File({ filename: "winstonLogger" }));
// O'zi fikrlagin xatolaring bo'lsa nima qilasan?
//1.fayl ochasanda
//2.faylni nomini berasan
//3.faylni transportni tanlaysan (File,Console,Loggly)
//4.keyin pastga o'tib faylga yozasan

module.exports = async function logger(req, res, next) {
  try {
    const getter = await Categories.find();
    res.send(getter);
    next();
  } catch (er) {
    winston.error(er.message, er);
    //Errorni o'rniga ixtiyoriy tipni berasan xatolar uchun bo'lganini
    //winston.LogCallback -> yozish kerak yani (er)-> o'zida qachon yozilganlarni saqlaydi
    return res.status(500).send("Serverda kutilmagan xato ro'y berdi");
  }
};
// bu yerda Frontga mongodbga ulanish bo'lmasa logga o'xshash
//narsa yozib chiqarganman
//yani buni middleware qilib ishlatsa bo'ladi
