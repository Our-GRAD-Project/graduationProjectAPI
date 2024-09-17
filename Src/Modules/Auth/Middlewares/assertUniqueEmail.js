import ServerError, {
  catchAsyncError,
} from "../../../../Utils/errorHandeling.js";
import userModel from "../../User/Models/user.model.js";

export const assertUniqueEmail = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });
  if (user) throw new ServerError("This email is already taken", 400);
  next();
});
