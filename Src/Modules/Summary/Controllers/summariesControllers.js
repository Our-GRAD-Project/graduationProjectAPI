import mongoose from "mongoose";
import summaryModel from "../Models/summaryModel.js";
import { ApiFeatures } from "../../../../Utils/apiFeatures.js";
import ServerError, { catchAsyncError } from "../../../../Utils/errorHandeling.js";
import userModel from "../../User/Models/user.model.js";
import { sendNotification } from "../../Notification/utils/notifyAllUsers.js";
import { stripe } from "../../../../Utils/onlinePayment.js";



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
    
    const users = await userModel.find({fcmToken: { $exists: true, $ne: ""} })
    try {
        const notificationPromises = users.map(user => {
            return sendNotification(
                user.fcmToken,
                "New Summary Available",
                 `${summary.title} you can read it now !!`
                )
        })
        await Promise.allSettled(notificationPromises)    
    } catch (error) {
        throw new ServerError("Error in sending notifications", 500)
    }
    
    res.status(201).json({
        message:"success"
    })
})


export const getSummary = catchAsyncError(async(req,res) => {
    const summary = await summaryModel.findOne({_id:req.params.Id})
    res.json({
        summary
    })
})
export const deleteSummary = catchAsyncError(async(req,res) => {
    const summary = await summaryModel.findByIdAndDelete(req.params.Id)
    res.json({
        summary
    })
})


export const getSummariesOfCategory = catchAsyncError(async(req,res) => {
    const { categoryId } = req.params
    const summaries = await summaryModel.find({category_id: categoryId})
    res.json({
        summaries
    })
})

export const createCheckoutSession = catchAsyncError(async(req,res)=>{
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price:"prod_SaATrMoiSXLVi9",
                quantity: 1
            }
        ],
        mode: "subscription",
        success_url: 'https://www.youtube.com/watch?v=RTP3wGflIOw',  //link after finishing the payment
        cancel_url: 'https://www.youtube.com/watch?v=RTP3wGflIOw',   //link if cancel the payment
        client_reference_id: cart._id,
        customer_email: req.user.email,
    })

    res.json({ session })
})