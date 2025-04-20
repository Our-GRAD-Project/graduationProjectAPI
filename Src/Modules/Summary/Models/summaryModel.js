import mongoose from "mongoose";
import { LANGUAGES } from "../../../../Utils/enums.js";

const summarySchema = new mongoose.Schema({
    title:{
        type:String,
        minLength: 2,
        
    },
    author:{
        type:String,
        minLength:2,
        maxLength:20,
        required:true,
    },
    description: {
        type: String,
        minLength: 3,
        required: true,
        trim: true
    },
    content: {
        type: String,
        minLength: 3,
        required: true,
        trim: true
    },
    language: {
        type: String,
        enum:{
            values: [LANGUAGES.ENGLISH]
        },
        default: LANGUAGES.ENGLISH,
        required: true
    },
    coverImage: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'image'
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    audio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'audio',
    }
},
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

summarySchema.pre(/find/i, function (next) {
    this.populate('coverImage')
    this.populate('subcategory_id')
    next()
})

summarySchema.pre(/delete/i, async function (next) {
    const summaryWillBeDeleted = await summaryModel.findOne(this._conditions)
    if (!summaryWillBeDeleted) return next()
    await mongoose.model('image').findByIdAndDelete(summaryWillBeDeleted.coverImage)
    next()
})

summarySchema.pre(/update/i, async function (next) {
    if (!this._update.coverImage) return next()
	const toBeUpdatedSummary = await summaryModel.findOne(this._conditions)
	if (!toBeUpdatedSummary) return next()

	await mongoose
		.model('image')
		.findByIdAndDelete(toBeUpdatedSummary.coverImage)
	next()
})

const summaryModel = mongoose.model("summary", summarySchema)
export default summaryModel