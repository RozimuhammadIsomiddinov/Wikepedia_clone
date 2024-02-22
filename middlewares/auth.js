const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  const token = req.header("x-auth-clener-token");
  if (!token)
    return res.status(400).send("Mavjud bo'lmagan token orqali kirilmaydi!!!");
  try {
    const decoded = jwt.verify(token, "parol777");
    req.user = decoded;
    next();
  } catch (er) {
    return res.status(401).send("Yaroqsiz token");
  }
};
