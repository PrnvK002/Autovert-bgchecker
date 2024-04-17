import Joi from "joi";

export const infoSchema = Joi.object({
  type: Joi.string().required(),
  fieldData: Joi.array().items(
    Joi.object({
      fieldName: Joi.string(),
      value: Joi.any(),
    })
  ),
});
