export interface fieldproptype {
  name: string;
  visibility: boolean;
  inputType: string;
  type: string;
  handleChange: (key: string, value: any, index: number) => void;
  index: number;
}

export interface field {
  inputType: string;
  name: string;
  visibilty: boolean;
  options?: string[];
  rules?: Rule[];
}

export interface fields {
  professionalInfoFields: field[];
  personalInfoFields: field[];
  educationInfoFeilds: field[];
  docFields: field[];
}
export interface fieldInitialState {
  loading: boolean;
  err: string;
  fields: fields | any;
  success: boolean;
}

export interface fieldfamilyproptype {
  name: string;
  fields: field[];
  setFielddata: any;
}

interface fieldkeys {
  [key: string]: string;
}

export const fieldKeys: fieldkeys = {
  personalInfoFields: "Personal Info Fields",
  professionalInfoFields: "Professional Info Fields",
  educationInfoFeilds: "Education Info Fields",
  docFields: "Doc Fields",
};

export interface AddfieldModalProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (d: AddFieldParams) => void;
}

interface Rule {
  ruleName: string;
  value: any;
}
export interface AddFieldParams {
  category: string;
  name: string;
  options?: string[];
  inputType: string;
  rules?: Rule[];
}

export interface InputFieldprops {
  name: string;
  inputType: string;
  handleChange?: (e: any) => void;
  value?: string | any;
  handleDocs?: (e: any) => void;
  options: any;
  tab?: string;
  register: any;
}

export interface ListfieldProps {
  tab: string;
  setData?: any;
  data?: any;
  fields: any;
  handleDocs?: (e: any) => void;
  register: any;
}
