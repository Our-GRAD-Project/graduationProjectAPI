import jwt from "jsonwebtoken";
import transporter from "../../../../Utils/emails.js";
import ServerError, {
  catchAsyncError,
} from "../../../../Utils/errorHandeling.js";
import { hashPassword, verifyPassword } from "../../../../Utils/hashing.js";
import { createToken } from "../../../../Utils/token.js";
import userModel from "../../User/Models/user.model.js";
import crypto from "node:crypto"
export const signup = catchAsyncError(async (req, res) => {
  const { userName, email, password } = req.body;
  const pass = hashPassword(password);
  const user = await userModel.create({
    userName,
    email,
    password: pass,
  });
  const { _id: id, role } = user;
  const data = { id, userName, role };
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

  const { userName, role, _id: id } = user;
  const data = { userName, role, id };
  const token = createToken(data);
  res.cookie("token", token, {
    httpOnly: true, // Prevent JavaScript access
    secure: true, // Send only over HTTPS
    sameSite: "Strict", // Prevent CSRF by restricting cross-origin requests
  });
  res.json({ message: "signed in successfully" });
});

export const sendResetcode = catchAsyncError(async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) throw new ServerError("this email is not registered", 404);

  const resetCode = crypto.randomInt(100000, 999999).toString()
  const resetToken = createToken({email:user.email})
  user.resetCode = resetCode;
  user.resetCodeExpire = Date.now() + 5 * 60 * 1000; // Code valid for 5 minutes
  user.resetToken = resetToken
  await user.save();
  transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Reset Your Password",
    text: `You Asked To Reset Your Pass here is your code : ${resetCode}`,
  });
  res.json({ message: "check your mail", resetToken });
});

export const verifyCode = catchAsyncError(async (req, res) => {
  const {resetToken, resetCode} = req.body
  try {
  const decoded = jwt.verify(resetToken,process.env.TOKEN_SECRET)
  const user = await userModel.findOne({email:decoded.email})
  if(!user || user.resetCode !== resetCode){ throw new ServerError("Wrong or expired code", 400)}
  if (user.resetCodeExpire < Date.now()){ throw new ServerError("expired code", 400)}
  res.json({message: "code verified"})
  } catch (error){
    throw new ServerError(error.message, 498);
  }
  })

export const settingNewPassword = catchAsyncError(async (req, res) => {
  const { password, resetToken } = req.body;

  try {
    const decoded = jwt.verify(resetToken, process.env.TOKEN_SECRET);
    const newPassword = hashPassword(password);
    await userModel.updateOne(
      { email: decoded.email },
      { password: newPassword,
        resetCode :null,
        resetToken : null,
        resetCodeExpire : null
      });
    res.json({ message: "password reset successfully" });
  } catch (error) {
    throw new ServerError(error.message, 498);
  }
});



export const googleOAuthCallback = catchAsyncError(async(req,res)=>{
  const profile = req.user
  let user =  await userModel.findOne({email: profile.emails[0].value})

  if(!user){
    user =  await userModel.create({
      googleId: profile.id,
      userName: profile.displayname,
      email: profile.email[0].value,
      password:null,
    })
  }else if(!user.googleId){
    user.googleId = profile.id
    await user.save()
  }

  const token = createToken({userName:user.userName, role: user.role, id: user._id})
  res.cookie("token", token, {
    httpOnly: true, // Prevent JavaScript access
    secure: true, // Send only over HTTPS
    sameSite: "Strict", // Prevent CSRF by restricting cross-origin requests
  });
  res.json({message: "success"})
})