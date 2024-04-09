import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Version } from "../models/versions.model";

//@desc for getting latest version info
//@route GET /version/get

export const getVersionInfo = asyncHandler(
  async (req: Request, res: Response) => {
    const versionInfo = await Version.findOne({}, {}, { sort: { _id: -1 } })
      .populate("templateId")
      .populate("fieldsId");

    res.status(200).json({ data: versionInfo });
  }
);

//@desc for creating new version after udpation of order
//@route POST /version/order

export const updateOrder = asyncHandler(async (req: Request, res: Response) => {
  console.log("udpateorder", req.body);
  const { templateId, order, fieldsId } = req.body;
  const udateVersion = await Version.create({
    templateId: templateId,
    order: order,
    fieldsId: fieldsId,
  });
  res.status(201).json({ message: "Successfully changed the order" });
});
