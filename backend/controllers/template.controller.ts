import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Version } from "../models/versions.model";
import { Template } from "../models/template.model";

export const getTemplate = asyncHandler(async (req: Request, res: Response) => {
  const template = await Template.findOne({}, {}, { sort: { _id: -1 } });
  res.status(200).json({ data: template });
});

export const addTemplate = asyncHandler(async (req: Request, res: Response) => {
  const { labelColor, headingColor, bgColor } = req.body;
  const template = new Template({
    labelColor,
    headingColor,
    bgColor,
  });
  const temp = await template.save();
  console.log("template",temp);
  const oldVersion = await Version.findOne({}, {}, { sort: { _id: -1 } });
  const newVersion = await Version.create({
    templateId: template._id,
    order: oldVersion?.order,
    fieldsId: oldVersion?.fieldsId,
  });
  res.status(200).json({template});
});
