import { Schema, Types, model } from "mongoose";

const fieldSchema = new Schema(
  {
    name: String,
    visibilty: {
      type: Boolean,
      default: true,
    },
    type: String,
  },
  { _id: false }
);

const fieldsSchema = new Schema(
  {
    personalInfoFields: [fieldSchema],
    educationInfoFeilds: [fieldSchema],
    professionalInfoFields: [fieldSchema],
    docFields: [fieldSchema],
  },
  { timestamps: true }
);

export const Fields = model("Fields", fieldsSchema);
