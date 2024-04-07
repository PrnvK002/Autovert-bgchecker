import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Users } from "../models/user.model";

//@desc route for submitting applicant info
//@access public
export const submitInfo = asyncHandler(async (req: any, res: Response) => {
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
});

//@desc route for gettting applicants
//@access admin
export const getApplicants = asyncHandler(
  async (req: Request, res: Response) => {
    const applicants = await Users.find({ role: "Applicant" });
    res.status(200).json({ data: applicants });
  }
);
