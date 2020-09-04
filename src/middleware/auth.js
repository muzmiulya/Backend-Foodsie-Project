const jwt = require("jsonwebtoken");
const helper = require("../helper/index");

module.exports = {
  authorization: (request, response, next) => {
    let token = request.headers.authorization;
    if (token) {
      // validasi token jwt
      token = token.split(" ")[1];
      jwt.verify(token, "RAHASIA", (error, result) => {
        console.log(error);
        if (
          (error && error.name === "JsonWebTokenError") ||
          (error && error.name === "TokenExpiredError")
        ) {
          return helper.response(response, 403, error.message);
        } else {
          console.log(result);
          request.token = result;
          next();
        }
      });
    } else {
      return helper.response(response, 400, "Please Login First");
    }
  },
  authorization2: (request, response, next) => {
    let token = request.headers.authorization;
    if (token) {
      // validasi token jwt
      token = token.split(" ")[1];
      jwt.verify(token, "RAHASIA", (error, result) => {
        console.log(error);
        if (
          (error && error.name === "JsonWebTokenError") ||
          (error && error.name === "TokenExpiredError")
        ) {
          return helper.response(response, 403, error.message);
        } else {
          // console.log(result);
          if (result.user_role === 2) {
            return helper.response(response, 400, "You can't access this Path");
          } else {
            request.token = result;
            next();
          }
        }
      });
    } else {
      return helper.response(response, 400, "Please Login First");
    }
  },
};
