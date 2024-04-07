import Joi from "joi";

export const addfieldSchema = Joi.object({
  personalInfoFields: Joi.array().items(
    Joi.object({
      fieldName: Joi.string(),
      value: Joi.string(),
    })
  ),
  educationInfoFeilds: Joi.array().items(
    Joi.object({
      fieldName: Joi.string(),
      value: Joi.string(),
    })
  ),
  professionalInfoFields: Joi.array().items(
    Joi.object({
      fieldName: Joi.string(),
      value: Joi.string(),
    })
  ),
  docFields: Joi.array().items(
    Joi.object({
      fieldName: Joi.string(),
      value: Joi.string(),
    })
  ),
});
