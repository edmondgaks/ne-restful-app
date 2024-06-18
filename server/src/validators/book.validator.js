import Joi from "joi";
import { errorResponse } from "../utils/api.response.js";

export async function validateBookRegistration(req, res, next) {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      author: Joi.string().required(),
      publisher: Joi.string().required(),
      publicationYear: Joi.number().required(),
      subject: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return errorResponse(error.message, res);

    return next();
  } catch (ex) {
    return errorResponse(ex.message, res);
  }
}
