import { Router } from "express";
import validate from "../../../Middlewares/validation.js";
import { assertUniqueEmail } from "../Middlewares/assertUniqueEmail.js";
import { assertUniqueUserName } from "../Middlewares/assertUniqueUserName.js";
import {
  googleOAuthCallback,
  sendResetcode,
  settingNewPassword,
  signIn,
  signup,
  verifyCode,
} from "../Controllers/auth.controllers.js";
import {
  newPassSchema,
  resetPassSchema,
  signinSchema,
  signupSchema,
  verifyCodeSchema,
} from "../Validations/auth.validation.js";
import { googleReturnCallback, requestGoogle } from "../Middlewares/googleAuth.js";
import passport from "passport";

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

router.route("/google").get(requestGoogle);
router.route("/google/callback").get(googleReturnCallback,googleOAuthCallback);

router
  .route("/send-code")
  .post(validate(resetPassSchema), sendResetcode);
router
  .route("/verify-code")
  .post(validate(verifyCodeSchema), verifyCode);

router
  .route("/reset-password/confirm")
  .post(validate(newPassSchema), settingNewPassword);

export default router;
