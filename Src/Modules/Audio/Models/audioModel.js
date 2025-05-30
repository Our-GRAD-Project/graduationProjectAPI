import mongoose from 'mongoose'
import { deleteImage } from '../../Images/Utils/imageUtils.js'

const audioSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		minLength: 3,
		maxLength: 500,
		required: true,
	},
	path: {
		type: String,
		trim: true,
		required: true,
	},
})


audioSchema.pre(/delete/i, async function (next) {
	const audioWillBeDeleted = await audioModel.findOne(this._conditions)
	if (!audioWillBeDeleted) return next()
	await deleteImage(audioWillBeDeleted.name)
	next()
})

const audioModel = mongoose.model('audio', audioSchema)

export default audioModel