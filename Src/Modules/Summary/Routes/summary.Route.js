import { Router } from "express";
import { upload } from "../../../Middlewares/upload.js";
import validate from "../../../Middlewares/validation.js";
import { addSummary, deleteSummary, getRecommendedSummaries, getSummaries, getSummariesOfCategory, getSummary } from "../Controllers/summariesControllers.js";
import { addSummarySchema } from "../Validations/summariesValidation.js";
import { authenticate } from "../../Auth/Middlewares/authenticate.js";
import reviewRouter from "./review.route.js";
import { attachAudioFile, attachCoverImage } from "../Middlewares/summaryMiddlewares.js";
const router = Router()

router.route('/')
    .get(getSummaries)
    .post(
        upload.fields([
            { name: 'coverImage', maxCount: 1 },
            { name: 'audio', maxCount: 1 },
    ]),
        validate(addSummarySchema),
        attachCoverImage(),
        attachAudioFile(),
        addSummary,
    )

router.route('/recommended')
   .get(authenticate ,getRecommendedSummaries)


router.route('/:Id')
.get(getSummary)
.delete(deleteSummary)

router.route('/category/:categoryId')
.get(getSummariesOfCategory)


router.use('/:summaryId/reviews/', reviewRouter)

export default router