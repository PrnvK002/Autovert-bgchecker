const validatorObj: any = {
  required: (params: any, field: any, data: any) => {
    if (!data[field.name]) {
      return `${field.name} is required!`;
    }
  },
  onlynumbers: (params: any, field: any, data: any) => {
    if (!isNaN(data[field.name]) && !isNaN(parseFloat(data[field.name]))) {
      return `Please add a valid ${field.name}! Can only contain numbers characters not allowed.`;
    }
  },
  onlycharacters: (params: any, field: any, data: any) => {
    if (/^[a-zA-Z]+$/.test(data[field.name])) {
      return "";
    } else {
      return `Please add a valid ${field.name}! Can only contain characters numbers not allowed.`;
    }
  },
  minlength: (params: any, field: any, data: any) => {
    if (data[field.name].length < params) {
      return `${field.name} should atleast contain ${params} characters!`;
    }
  },
  maxlength: (params: any, field: any, data: any) => {
    if (data[field.name].length > params) {
      return `${field.name} can only contain ${params} characters!`;
    }
  },
};

export const validateStep = (fields: any, data: any, activeTab: string) => {
  console.log("data on validation setp", data, fields);
  let error = "";
  for (let field of fields[activeTab]) {
    for (let validation of field.validations) {
      error = validatorObj[validation.ruleName](validation.value, field, data);
      if (error) {
        break;
      } else {
        continue;
      }
    }
    if (error) {
      break;
    } else {
      continue;
    }
  }
  return error;
};
