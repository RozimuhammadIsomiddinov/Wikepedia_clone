const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  const token = req.header("x-users-token");
  if (!token)
    return res.status(400).send("Mavjud bo'lmagan token orqali kirilmaydi!!!");
  try {
    const decoded = jwt.verify(token, "p@r0l");
    req.user = decoded;
    next();
  } catch (er) {
    return res.status(401).send("Yaroqsiz token");
  }
};
