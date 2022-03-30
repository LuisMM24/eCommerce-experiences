const { User } = require("../models");
import { Request, Response, NextFunction } from "express";
import { Req } from "../middleware/auth-middleware";

const signUp = async (
  req: Req,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    uid,
    firstName = null,
    lastName = null,
    email,
    password = null,
    picture = null,
    role = "client",
  } = req.user;
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
      password: password,
      profileImage: picture,
      role: role,
    });
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
};

const loginUser = async (
  req: Req,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { email } = req.user;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return res.sendStatus(200);
    }
    return res.status(400).send({
      error: "user not found",
    });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.id;
  const userData = req.body;
  try {
    await User.findOneAndUpdate({ _id: id }, userData);
  } catch (err) {
    next(err);
  }
};

const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await User.find({});
    res.status(200).send({
      body: users,
    });
  } catch (err) {
    next(err);
  }
};

const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.id;
  try {
    const user = await User.findOneById({ _id: id });
    res.status(200).send({
      body: user,
    });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.id;
  try {
    await User.findOneAndDelete({ _id: id });
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signUp: signUp,
  updateUser: updateUser,
  getUsers: getUsers,
  getUserById: getUserById,
  deleteUser: deleteUser,
  loginUser: loginUser,
};
