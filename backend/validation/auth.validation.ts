import Joi from "joi";

export const createUserSchema = Joi.object({
  email: Joi.string().required(),
  // .pattern("/^[0-9]+$/"),
  password: Joi.string().min(6),
  role: Joi.string().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6),
  role: Joi.string().required(),
});
