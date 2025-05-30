import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 50,
        required: true,
        unique: true,
        trim: true
    },
},
    { timestamps: true }
)
    
const categoryModel = mongoose.model('Category', categorySchema)

export default categoryModel