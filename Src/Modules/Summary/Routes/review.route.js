import { Router } from "express"
import { addReview, deleteReview, getReviews, updateReview } from "../Controllers/reveiwContrrollers.js"
import validate from "../../../Middlewares/validation.js"
import { authenticate } from "../../Auth/Middlewares/authenticate.js"

const router = Router({ mergeParams: true })

router
	.route('/')
	.get(
		// validate(getReviewsSchema),
		 getReviews)
	.post(
		authenticate,
		// authorize(ROLES.USER),
		// validate(addReviewSchema),
		addReview
	)
	.put(
		authenticate,

		// authorize(ROLES.USER),
		// validate(updateReviewSchema),
		updateReview
	)
	.delete(
		authenticate,
		// authorize(ROLES.USER),
		// validate(deleteReviewSchema),
		deleteReview
	)
export default router