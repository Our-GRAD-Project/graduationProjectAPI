import ServerError, {
  catchAsyncError,
} from "../../../../Utils/errorHandeling.js";
import { hashPassword, verifyPassword } from "../../../../Utils/hashing.js";
import { createToken } from "../../../../Utils/token.js";
import userModel from "../../User/Models/user.model.js";

export const signup = catchAsyncError(async (req, res) => {
  const { firstName, lastName, userName, email, phone, password } = req.body;
  const pass = hashPassword(password);
  const signupDate = new Date();
  const user = await userModel.create({
    firstName,
    lastName,
    userName,
    email,
    phone,
    password: pass,
    signupDate,
  });
  const { _id: id, role } = user;
  const data = { id, userName, firstName, role };
  const token = createToken(data);
  res.cookie("token", token, {
    httpOnly: true, // Prevent JavaScript access
    secure: true, // Send only over HTTPS
    sameSite: "Strict", // Prevent CSRF by restricting cross-origin requests
  });

  res.status(201).json({ messgae: "added" });
});

export const signIn = catchAsyncError(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user || !verifyPassword(password, user.password))
    throw new ServerError("Wrong email or password");

  const { firstName, userName, role, _id: id } = user;
  const data = { firstName, userName, role, id };
  const token = createToken(data);
  res.cookie("token", token, {
    httpOnly: true, // Prevent JavaScript access
    secure: true, // Send only over HTTPS
    sameSite: "Strict", // Prevent CSRF by restricting cross-origin requests
  });
  res.json({ message: "signed in successfully" });
});
