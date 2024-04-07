import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

import { Users } from "../models/user.model";
import { Version } from "../models/versions.model";
import { userBody, userResponse } from "../types/auth.types";
import generateToken from "../utils/generatetoken.util";

export const authLogin = asyncHandler(async (req: Request, res: Response) => {
  console.log(req.body);

  const body: userBody = req.body;
  const isAdmin = await Users.checkIsadmin(body.email);
  let responseData: Partial<userResponse> = {};
  if (!isAdmin) {
    const version = await Version.findOne(
      {},
      { _id: 1 },
      { sort: { _id: -1 } }
    ).populate('fieldsId');
    console.log("version", version);
    const user = new Users({
      email: body.email,
      role: "Applicant",
      version: version?._id,
      
    })
    const newUser = await user.save();
    console.log("created new user",newUser);
    responseData = {
      token: generateToken(String(user._id)),
      user: { email: user.email, role: user.role },
      fields: version?.fieldsId,
      order: version?.order
    }
  } else if (isAdmin && await isAdmin.matchPassword(body.password)) {
    responseData.token = generateToken(isAdmin._id);
    responseData.user = { email: isAdmin.email, role: isAdmin.role };
  }
  res.status(200).json({ data: responseData });
});

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const body: userBody = req.body;
  let ecrypted = await bcrypt.hash(req.body.password, 10);
  const user = await Users.create({
    email: req.body.email,
    role: req.body.role,
    password: ecrypted,
  });
  if (user) {
    res.status(201).json({
      message: "created user",
    });
  }
});
