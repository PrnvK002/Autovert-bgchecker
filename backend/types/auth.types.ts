export interface userBody {
  email: String;
  role: String;
  password?: String;
}

interface field {
  name: String;
  visibility: Boolean;
  type: String;
}

interface fields {
  personalInfoFields: [field];
  educationInfoFeilds: [field];
  professionalInfoFields: [field];
  docFields: [field];
}

export interface userResponse {
  token: String;
  user: userBody;
  fields?: fields | any;
  order?: String[];
}
