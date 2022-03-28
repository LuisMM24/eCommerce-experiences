import { Request, Response, NextFunction } from "express";
module.exports = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err);
  res.status(500).send({
    data: null,
    error: "Something went wrong",
  });
};
