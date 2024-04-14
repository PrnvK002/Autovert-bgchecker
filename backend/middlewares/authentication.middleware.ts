import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";
import { Users } from "../models/user.model";

const authenticationMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      let token = req.headers.authorization.split(" ")[1];
      const decode: any = jwt.verify(token, process.env.JWT_SECRET!);
      req.user = await Users.findById(decode?.id).select("-password");
      next();
    } catch (err) {
      res.status(401);
      const error = "User not logged in";
      next(error);
    }
  } else {
    res.status(401);
    // throw new Error('User not logged in');
    const error = "User not logged in";
    next(error);
  }
};

export default authenticationMiddleware;
