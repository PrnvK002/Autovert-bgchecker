import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Fields } from "../models/fields.model";
import { prependOnceListener } from "process";
import { Version } from "../models/versions.model";

export const getFields = asyncHandler(async (req: Request, res: Response) => {
  const fields = await Fields.findOne({}, {}, { sort: { _id: -1 } });
  res.status(200).json({ data: fields });
});

export const addFields = asyncHandler(async (req: Request, res: Response) => {
  const {
    personalInfoFields,
    educationInfoFeilds,
    professionalInfoFields,
    docFields,
  } = req.body;
  const fields = new Fields({
    personalInfoFields,
    educationInfoFeilds,
    professionalInfoFields,
    docFields,
  });
  await fields.save();
  const oldVersion = await Version.findOne({}, {}, { sort: { _id: -1 } });
  const newVersion = await Version.create({
    templateId: oldVersion?.templateId,
    order: oldVersion?.order,
    fieldsId: fields._id,
  });
  res.status(201).json({ fields });
});
