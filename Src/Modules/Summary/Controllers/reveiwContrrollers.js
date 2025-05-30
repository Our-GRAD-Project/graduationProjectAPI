import { ApiFeatures } from "../../../../Utils/apiFeatures.js"
import ServerError, { catchAsyncError } from "../../../../Utils/errorHandeling.js"
import reviewModel from "../Models/reviewModel.js"
import summaryModel from "../Models/summaryModel.js"


export const getReviews = catchAsyncError(async (req, res) => {
    const summary = await summaryModel.findById(req.params.summaryId)
    if (!summary) throw new ServerError("invalid id", 400)
    const apiFeatures = new ApiFeatures(reviewModel.find(
        { summary_id: summary._id }),
        req.query
    ).paginate(5)
    const reviews = await apiFeatures.query
    res.json({ reviews })
})

export const addReview = catchAsyncError(async (req, res) => {
    const summary = await summaryModel.findById(req.params.summaryId)
    if (!summary) throw new ServerError("invalid id", 400)
    
    const addedReview = await reviewModel.findOne({
        user_id: req.user.id,
        summary_id: summary._id
    })
    if(addedReview) throw new ServerError("review already exists", 400)
    const review = await reviewModel.create({
        ...req.body,
        user_id: req.user.id,
        product_id: product._id
    }) 
    res.status(201).json({ review })
})
export const updateReview = catchAsyncError(async (req, res) => {
    const summary = await summaryModel.findById(req.params.summaryId)
    if (!summary) throw new ServerError("invalid id", 400)
    
    const review = await reviewModel.findOneAndUpdate({
        user_id: req.user.id,
        summary_id: summary._id
    }, req.body)
    res.status(201).json({ review })
})

export const deleteReview = catchAsyncError(async (req, res) => {
    const summary = await summaryModel.findById(req.params.summaryId)
    if (!summary) throw new ServerError("invalid id", 400)
	const review = await reviewModel.findOneAndDelete({
		user_id: req.user.id,
        summary_id: summary._id
	})
	res.json({ review })
})