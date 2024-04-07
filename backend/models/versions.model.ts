import { Schema, Types, model } from "mongoose";

const versionSchema = new Schema(
  {
    templateId: {
      type: Types.ObjectId,
      ref: "Templates",
    },
    order: {
      type: [String]
    },
    fieldsId: {
      type: Types.ObjectId,
      ref: "Fields",
    },
  },
  { timestamps: true }
);

export const Version = model('Version',versionSchema)