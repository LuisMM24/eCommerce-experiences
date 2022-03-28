const { User } = require("../models");
import { Request, Response, NextFunction } from "express";

const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { firstName, lastName, email, role, password, uid } = req.body;
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
      role: role,
    });
    res.sendStatus(201);
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

const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = User.findOne({ email: email });
    if (user) {
      const isValidPass = User.comparePassword(password);
      if (isValidPass) {
        res.sendStatus(200);
        return;
      }
      res.status(400).send({
        error: "bad password",
      });
      return;
    }
    res.status(400).send({
      error: "bad email",
    });
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
