import { Router } from "express";
import validate from "../../../Middlewares/validation.js";
import { assertUniqueEmail } from "../Middlewares/assertUniqueEmail.js";
import { assertUniqueUserName } from "../Middlewares/assertUniqueUserName.js";
import {
  sendResetPortal,
  settingNewPassword,
  signIn,
  signup,
} from "../Controllers/auth.controllers.js";
import {
  newPassSchema,
  resetPassSchema,
  signinSchema,
  signupSchema,
} from "../Validations/auth.validation.js";

const router = Router();

router
  .route("/signup")
  .post(
    validate(signupSchema),
    assertUniqueEmail,
    assertUniqueUserName,
    signup
  );
router.route("/signin").post(validate(signinSchema), signIn);

router
  .route("/reset-password")
  .post(validate(resetPassSchema), sendResetPortal);

router
  .route("/reset-password/confirm")
  .post(validate(newPassSchema), settingNewPassword);

export default router;
