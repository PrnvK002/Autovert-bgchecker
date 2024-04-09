import { Schema, Types, Model, model } from "mongoose";
import { userDocType, userModeltype } from "../types/usermodel.type";
import bcrypt from "bcryptjs";

const dynamicFieldSchema = new Schema(
  {
    fieldName: String,
    value: String,
  },
  { _id: false }
);

const userSchema = new Schema<userDocType, userModeltype>(
  {
    email: { type: String, required: true },
    password: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      enum: {
        values: ["Admin", "Applicant"],
        message: "{VALUE} is not supported",
      },
    },
    version: {
      type: Types.ObjectId,
      ref: "Versions",
      // required: function () {
      //   return this.role === "Applicant";
      // },
    },
    personalInfo: [dynamicFieldSchema],
    education: [dynamicFieldSchema],
    professional: [dynamicFieldSchema],
    uploadedDocs: [dynamicFieldSchema],
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (password: string) {
  console.log("password", password, this.password, this.email);
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.checkIsadmin = function (email: String): Promise<any> {
  return this.findOne({ email: email});
};

export const Users = model<userDocType, userModeltype>("Users", userSchema);
