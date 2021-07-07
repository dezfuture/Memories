import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    // to get the token from the frontend
    const token = req.headers.authorization.split("")[1];

    const isCutomAuth = token.length < 500;

    let decodedData;

    if (token && isCutomAuth) {
      decodedData = jwt.verify(token, "test");

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub; //'sub' -> google's name for a specic id which differentiate every user
    }

    next();
  } catch (err) {
    console.log(err);
  }
};

export default auth;