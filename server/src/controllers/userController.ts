const { User } = require("../models");
import { Request, Response, NextFunction } from "express";

const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { firstName, lastName, email, uid } = req.body;
  try {
    const user = await User.findOne({ _id: uid });
    if (user) {
      res.status(400).send({
        error: "User already exist",
      });
      return;
    }
    await User.create({
      _id: uid,
      firstName: firstName,
      lastName: lastName,
      email: email,
    });
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
};

async function updateUser(req: Request, res: Response, next: NextFunction) {}

module.exports = {
  signUp: signUp,
  updateUser: updateUser,
};
