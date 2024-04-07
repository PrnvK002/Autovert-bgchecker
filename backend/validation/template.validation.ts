import Joi from "joi";

export const addtemplateSchema = Joi.object({
  labelColor: Joi.string().required(),
  headingColor: Joi.string().required(),
  bgColor: Joi.string().required(),
});
