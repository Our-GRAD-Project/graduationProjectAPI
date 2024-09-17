import ServerError, {
  catchAsyncError,
} from "../../../../Utils/errorHandeling.js";
import userModel from "../../User/Models/user.model.js";

export const assertUniqueUserName = catchAsyncError(async (req, res, next) => {
  const { userName } = req.body;
  const user = await userModel.findOne({ userName });
  if (user) throw new ServerError("This user name is already taken", 400);
  next();
});
