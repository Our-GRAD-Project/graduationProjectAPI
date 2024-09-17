import ServerError from "../../Utils/errorHandeling.js";

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(
      {
        body: req.body,
        params: req.params,
        query: req.query,
        ...(req.file && { file: req.file }), // similar to ternary operator just looks cooler
        ...(req.files && { files: req.files }),
      },
      {
        abortEarly: false,
      }
    );
    if (error) {
      throw new ServerError(
        error.details.map((d) => d.message),
        400
      );
    }
    next();
  };
};

export default validate;
