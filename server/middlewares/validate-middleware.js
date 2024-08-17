const validate = (schema) => async (req, res, next) => {
    try {
      const parsedBody = await schema.parseAsync(req.body);
      req.body = parsedBody;
      next();
    } catch (err) {
      const errorMessages = err.errors?.map(error => error.message) || ["Validation error"];
      res.status(400).json({ message: errorMessages.join(", ") });
    }
  };
  
  module.exports = validate;
  
  
  