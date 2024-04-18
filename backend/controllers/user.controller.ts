import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Users } from "../models/user.model";

//@desc route for submitting applicant info
//@access public
export const submitInfo = asyncHandler(async (req: any, res: Response) => {
  console.log("submit info", req.body, req.user);

  const { type, fieldData } = req.body;
  let update;
  switch (type) {
    case "PERSONALINFO":
      update = await Users.updateOne(
        { _id: req.user._id },
        { $set: { personalInfo: fieldData } }
      );
      break;
    case "EDUCATION":
      update = await Users.updateOne(
        { _id: req.user._id },
        { $set: { education: fieldData } }
      );
      break;
    case "PROFESSIONAL":
      update = await Users.updateOne(
        { _id: req.user._id },
        { $set: { professional: fieldData } }
      );
      break;
    case "UPLOADDOCS":
      update = await Users.updateOne(
        { _id: req.user._id },
        { $set: { uploadedDocs: fieldData } }
      );
      break;
    case "VERIFY":
      update = await Users.updateOne(
        {
          _id: req.user._id,
        },
        { $set: { verified: true } }
      );
    default:
      break;
  }
  res.status(200).json({ message: "success" });
});

//@desc route for gettting applicants
//@access admin
export const getApplicants = asyncHandler(
  async (req: Request, res: Response) => {
    const applicants = await Users.find(
      { role: "Applicant" },
      { version: 0, __v: 0 },
      { sort: { createdAt: -1 } }
    );
    console.log("applicants", applicants);

    res.status(200).json({ data: applicants });
  }
);

//@desc router for getting user data
//@access public
//@rout /user
//@method GET
export const getUser = asyncHandler(async (req: any, res: Response) => {
  const user = await Users.aggregate([
    { $match: { _id: req.user._id } },
    {
      $lookup: {
        from: "Version",
        localField: "version",
        foreignField: "_id",
        as: "version",
      },
    },
    {
      $unwind: "$version",
    },
    {
      $lookup: {
        from: "Fields",
        localField: "version.fieldsId",
        foreignField: "_id",
        as: "fields",
      },
    },
  ]);
  res.status(200).json({
    user: user[0],
    order: user[0]?.version.order,
    fields: user[0].fields,
  });
});

export const getApplicant = asyncHandler(async (req: any, res: Response) => {
  console.log(req.params.id);
  const { id } = req.params;
  const userData = await Users.findOne(
    { _id: id },
    { _id: 0, role: 0, password: 0 }
  );
  res.status(200).json({ data: userData });
});
