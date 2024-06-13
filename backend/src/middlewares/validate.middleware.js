import lodash from "lodash";
import joi from "joi";
import { ApiError } from "../utils/ApiError.js";
export const validateRequest = (schema) => {
  return (req, res, next) => {
    const validateSchema = lodash.pick(schema, ["body", "params", "query"]);
    const data = lodash.pick(req, Object.keys(validateSchema));
    const result = joi
      .compile(validateSchema)
      .prefs({ errors: { label: "key" } })
      .validate(data, {
        abortEarly: false,
      });
    if (result.error) {
      const errorMessage = result.error.details
        .map((detail) => detail.message)
        .join(", ");
      return next(new ApiError(errorMessage, 400));
    }
    if (!req.value) {
      req.value = {};
    }
    req.value = result.value;
    next();
  };
};
