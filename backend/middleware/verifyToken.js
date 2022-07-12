const jwt = require("jsonwebtoken");
const jwtUtil = require('../util/jwt.util.js');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.decode(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json("Token invalid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("Anda tidak terautentikasi");
  }
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.roleName === "buyer" || "seller") {
      next();
    } 
    else {
      res.status(403).json("Anda belum mendaftar!");
    }
  });
};

const verifySeller = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.roleName === "seller") {
      next();
    } else {
      res.status(403).json("Anda bukan seller!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyUser,
  verifySeller,
};
