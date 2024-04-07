import Joi from "joi";

export const updateorderSchema = Joi.object({
  templateId: Joi.string().required(),
  fieldsId: Joi.string().required(),
  order: Joi.array().items(Joi.string()),
});
