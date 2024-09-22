import joi from "joi";

export const signupSchema = joi.object({
  body: {
    firstName: joi.string().min(3).max(10).trim().required(),
    lastName: joi.string().min(3).max(10).trim().required(),
    userName: joi.string().min(3).max(15).trim().required(),
    email: joi.string().email({
      minDomainSegments: 2,
    }),
    password: joi
      .string()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/
      ),
    phone: joi
      .string()
      .max(15)
      .trim()
      .pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
      .required(),
  },
  params: {},
  query: {},
});

export const signinSchema = joi.object({
  body: {
    email: joi.string().email({
      minDomainSegments: 2,
    }),
    password: joi
      .string()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/
      ),
  },
  params: {},
  query: {},
});

export const resetPassSchema = joi.object({
  body: {
    email: joi.string().email({
      minDomainSegments: 2,
    }),
  },
  params: {},
  query: {},
});
export const newPassSchema = joi.object({
  body: {
    password: joi
      .string()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/
      ),
  },
  params: {},
  query: {
    token: joi.string(),
  },
});
