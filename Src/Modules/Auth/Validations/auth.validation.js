import joi from "joi";

export const signupSchema = joi.object({
  body: {
    userName: joi.string().min(3).max(15).trim().required(),
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

export const verifyCodeSchema = joi.object({
  body:{
    resetCode: joi.string().length(6),
    resetToken: joi.string()
  },
  params: {},
  query: {},
})
export const newPassSchema = joi.object({
  body: {
    password: joi
      .string()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/
      ),
      resetToken: joi.string()
  },
  params: {},
  query: {},
});
