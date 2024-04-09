import Joi from "joi";

export const addfieldSchema = Joi.object({
  personalInfoFields: Joi.array().items(
    Joi.object({
      name: Joi.string(),
      visibility: Joi.boolean(),
      type: Joi.string(),
      inputType: Joi.string(),
    })
  ),
  educationInfoFeilds: Joi.array().items(
    Joi.object({
      name: Joi.string(),
      visibility: Joi.boolean(),
      type: Joi.string(),
      inputType: Joi.string(),
    })
  ),
  professionalInfoFields: Joi.array().items(
    Joi.object({
      name: Joi.string(),
      visibility: Joi.boolean(),
      type: Joi.string(),
      inputType: Joi.string(),
    })
  ),
  docFields: Joi.array().items(
    Joi.object({
      name: Joi.string(),
      visibility: Joi.boolean(),
      type: Joi.string(),
      inputType: Joi.string(),
    })
  ),
});
