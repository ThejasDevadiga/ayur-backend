const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = (req, res, next) => {
  try {
     if (req.headers.authorization==undefined) {
      throw new Error("Authentication failed!");
    }
    if (req.body.requestedId==undefined){
      throw new Error("Auth :Requested id is not defined");
    }
    const token = req.headers.authorization.split(" ")[0];
    // console.log("Token :",token);
    const decodedToken = jwt.verify(token, "EMRSOFTWARE", { algorithms: ["HS256"] });
    // console.log("Decoded token : ",decodedToken);
    const userId = decodedToken.id;
    // console.log("ID : ",req.body.requestedId);
    // console.log("ID : ", userId);
console.log("Requested ")
    if ( req.body.requestedId !== userId) {
      // console.log("Authentication Unsuccessfull!");
      throw new Error("Invalid requesting id")
    } else {
      //  console.log("Authentication Successfull!");
      next();
    }
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      //   console.log("Expired token used!");
      res.status(400).json({
        error: "Token expired!",
      });
    } else {
      //  console.log("ERROR : ",e);
      res.status(400).json({
        error: e.message,
      });
    }
  }
};
