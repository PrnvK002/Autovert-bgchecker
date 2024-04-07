import { Types, Document, Model } from "mongoose";

interface field {
  fieldName: String;
  value: String;
}

export interface userDocType extends Document {
  _id?: Types.ObjectId;
  email: String;
  password?: String;
  role: String;
  version: Types.ObjectId | any;
  personalInfo: [field];
  education: [field];
  professional: [field];
  uploadedDocs: [field];
  verified: Boolean;
}

export interface userModeltype extends Model<userDocType> {
  checkIsadmin(email: String): Promise<any>;
}
