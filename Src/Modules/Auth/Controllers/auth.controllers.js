import jwt from "jsonwebtoken";
import transporter from "../../../../Utils/emails.js";
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

export const sendResetPortal = catchAsyncError(async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) throw new ServerError("this email is not registered", 404);

  const token = createToken({ email });

  transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Reset Your Password",
    text: "You Asked To Reset Your Pass",
    html: `<a>${token}</a>`,
  });
  res.json({ message: "check your mail" });
});

export const settingNewPassword = catchAsyncError(async (req, res) => {
  const { password } = req.body;
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const newPassword = hashPassword(password);
    await userModel.updateOne(
      { email: decoded.email },
      { password: newPassword }
    );
    res.json({ message: "password reset successfully" });
  } catch (error) {
    throw new ServerError(error.message, 498);
  }
});
