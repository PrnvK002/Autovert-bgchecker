import { Schema, model } from "mongoose";

const validationSchema = new Schema(
  {
    ruleName: String,
    value: Schema.Types.Mixed,
  },
  { _id: false }
);

const fieldSchema = new Schema(
  {
    name: String,
    visibilty: {
      type: Boolean,
      default: true,
    },
    options: { type: [String], required: false },
    validations: [validationSchema],
    inputType: String,
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
