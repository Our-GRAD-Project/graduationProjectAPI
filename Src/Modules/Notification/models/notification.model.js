import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    title: {
        type: String,
        minLength: 3,
        maxLength: 50,
        required: true,
        trim: true
    },
    body:{
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true,
        trim: true
    }
},
    { timestamps: true }
)
    
const notificationModel = mongoose.model('Notification', notificationSchema)

export default notificationModel
