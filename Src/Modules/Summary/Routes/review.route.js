import { Router } from "express"
import validate from "../../../Middlewares/validation.js"

const router = Router({ mergeParams: true })

router
	.route('/')
	.get(validate(getReviewsSchema), getReviews)
	.post(
		// authenticate,
		// authorize(ROLES.USER),
		validate(addReviewSchema),
		addReview
	)
	.put(
		// authenticate,
		// authorize(ROLES.USER),
		validate(updateReviewSchema),
		updateReview
	)
	.delete(
		// authenticate,
		// authorize(ROLES.USER),
		validate(deleteReviewSchema),
		deleteReview
	)
export default router