import mongoose from "mongoose";
import summaryModel from "../Models/summaryModel.js";
import { ApiFeatures } from "../../../../Utils/apiFeatures.js";
import ServerError, { catchAsyncError } from "../../../../Utils/errorHandeling.js";



export const getSummaries = catchAsyncError(async(req,res) => {
    const apiFeatures = new ApiFeatures(
        summaryModel.find(),req.query
    ).paginate().search(["title","description"])
    const summaries = await apiFeatures.query
    res.status(200).json({
        summaries
    })
})


export const getRecommendedSummaries = catchAsyncError(async(req,res) => {
    //send to model the user data to get the recommended summaries
    //recieve the recommended summaries from the model in recommendedSummaries array
    const objectIds = recommendedBookIds.map(id => mongoose.Types.ObjectId(id));
    const summaries = await summaryModel.find({
        _id: { $in: objectIds }
    });
    if(!summaries) throw new ServerError("no recommended summaries", 404)
    res.status(200).json({
        message:"success",
        summaries
    })
})



export const addSummary = catchAsyncError(async(req,res) => {
    const summary = await summaryModel.create(req.body)
    res.status(201).json({
        message:"success"
    })
})
export const getSummary = catchAsyncError(async(req,res) => {
    const summary = await summaryModel.findById(req.params.id)
    res.json({
        summary
    })
})
export const deleteSummary = catchAsyncError(async(req,res) => {
    const summary = await summaryModel.findByIdAndDelete(req.params.id)
    res.json({
        summary
    })
})