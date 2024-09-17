import bcrypt from "bcrypt";

export const hashPassword = (password) => {
  const hashedPass = bcrypt.hashSync(password, +process.env.SALTS);
  return hashedPass;
};

export const verifyPassword = (password, hashedPass) => {
  return bcrypt.compareSync(password, hashedPass);
};
