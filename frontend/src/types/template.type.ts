export interface Template {
  _v?: number;
  _id?: string;
  bgColor?: string;
  headingColor?: string;
  labelColor?: string;
}

export interface TemplateState {
  loading: boolean;
  err: String;
  template: Template;
  success: boolean;
}

export interface Colorpickerprops{
    color:string;
    name:string;
    setColor:(value: string) => void;
}
