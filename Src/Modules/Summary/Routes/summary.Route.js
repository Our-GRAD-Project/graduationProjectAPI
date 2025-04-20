import { Router } from "express";
import { upload } from "../../../Middlewares/upload.js";
import { attachCoverImage } from "../Middlewares/summaryMiddlewares.js";
import validate from "../../../Middlewares/validation.js";

const router = Router()

router.route('/')
    .get(getSummaries)
    .post(
        upload.single("cover_image"),
        validate(addSummarySchema),
        attachCoverImage(),
        addProduct,
    )


router.route('/:summaryId')
    .get(
        validate(getProductSchema),
        getProduct
).delete(
    validate(deleteProductSchema),
    deleteProduct
).put(
    upload.single("cover_image"),
    validate(updateProductSchema),
    attachCoverImage(),
    updateProductWithImages
)

router.use('/:productSlug/reviews/', reviewRouter)

export default router