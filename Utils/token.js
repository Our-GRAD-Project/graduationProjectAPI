import jwt from "jsonwebtoken";

export const createToken = (data) => {
  const token = jwt.sign(data, process.env.TOKEN_SECRET);
  return token;
};
