import { Schema, Types, model } from "mongoose";

const templateSchema = new Schema({
  labelColor: {
    type: String,
    required: true,
  },
  headingColor: {
    type: String,
    required: true,
  },
  bgColor: {
    type: String,
    required: true,
  },
});

export const Template = model('Templates',templateSchema);