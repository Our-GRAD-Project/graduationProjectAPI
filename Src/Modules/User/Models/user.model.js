import mongoose from "mongoose";
import { ROLE, SUBSCRIBTION } from "../../../../Utils/enums.js";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true,
    trim: true,
  },
  userName: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true,
    unique: true,
    trim: true,
  },
  dateOfBirth: {
    type: Date,
  },
  email: {
    type: String,
    lowercase: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    required: true,
  },
  recoveryEmail: {
    type: String,
    lowercase: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  phone: {
    type: String,
    maxlength: 15,
    match: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
  },
  role: {
    type: String,
    enum: {
      values: [ROLE.ADMIN, ROLE.USER], //to avoid magic strings
      message: "{VALUE} is not supported",
    },
    default: ROLE.USER,
    required: true,
  },
  subscribtionType: {
    type: String,
    enum: {
      values: [SUBSCRIBTION.FREE, SUBSCRIBTION.PREMIUM], //to avoid magic strings
      message: "{VALUE} is not supported",
    },
    default: SUBSCRIBTION.FREE,
    required: true,
  },
  signupDate: {
    type: Date,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  lastActiveDate: {
    type: Date,
  },
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
