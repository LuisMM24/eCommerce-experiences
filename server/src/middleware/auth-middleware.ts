import { Request, Response, NextFunction } from "express";
const auth = require("../firebase/firebase");

interface Req extends Request {
  user: Object;
}

module.exports = async (
  req: Req,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    const bearerToken = req.headers.authorization.substring(7);

    try {
      const userClaims = await auth.verifyIdToken(bearerToken);

      const { email, uid } = userClaims;
      req.user = {
        email: email,
        uid: uid,
      };
      next();
    } catch (err) {
      next(err);
    }
  } else {
    return res.status(401).send({
      data: null,
      error: "Unauthorized",
    });
  }
};
