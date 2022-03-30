import { Request, Response, NextFunction } from "express";
const { auth } = require("../firebase/firebase");

export interface Req extends Request {
  user: {
    uid: string;
    firstName?: String;
    lastName?: string;
    email: string;
    password?: string;
    picture?: string;
    role?: string;
  };
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

      const { uid, email, picture } = userClaims;
      // if user sign up with firstname and lastname
      const { firstName, lastName } = req.body;
      req.user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        uid: uid,
        picture: picture,
      };
      next();
    } catch (err) {
      next(err);
    }
  } else {
    return res.status(401).send({
      data: null,
      error: "You need to login in order to access this page",
    });
  }
};
