import { Router } from "express";
import validate from "../../../Middlewares/validation.js";
import { assertUniqueEmail } from "../Middlewares/assertUniqueEmail.js";
import { assertUniqueUserName } from "../Middlewares/assertUniqueUserName.js";
import { signIn, signup } from "../Controllers/auth.controllers.js";
import { signinSchema, signupSchema } from "../Validations/auth.validation.js";

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

export default router;
