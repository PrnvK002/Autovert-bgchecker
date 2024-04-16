export const validateStep = (fields: any, data: any, activeTab: string) => {
  console.log("data on validation setp", data, fields);
  let error= "";
  for(let field of fields[activeTab]){
    if(!data[field.name]){
        error = `${field.name} is required!`;
        break;
    }else{
        continue;
    }
  }
  return error;
};
