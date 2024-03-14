const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("../config/config");

const Authentication = (req, res, next) => {
  if (req.headers.authorization) {
    let decode = jwt.verify(
      req.headers.authorization,
      process.env.APP_SECRET,
      (err, res) => {
        if (err) {
          console.log(err);
          return "expired";
        }
        return res;
      }
    );
    if (decode == "expired") {
      res.staus(401).json({ status: "error", data: "token expired" });
    } else {
      next();
    }
  } else {
    res.status(401).json({ message: "Unauthorized access" });
  }
};
module.exports = Authentication;
