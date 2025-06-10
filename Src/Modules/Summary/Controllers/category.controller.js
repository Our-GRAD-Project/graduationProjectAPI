import { ApiFeatures } from "../../../../Utils/apiFeatures.js"
import { catchAsyncError } from "../../../../Utils/errorHandeling.js"
import categoryModel from "../Models/categoryModel.js"

export const getCategories = catchAsyncError(async(req,res) => {
    const apiFeatures = new ApiFeatures(
        categoryModel.find(),
        req.query
    ).paginate(10)
    const categories = await apiFeatures.query
    res.json({ categories })
})
export const getCategory = catchAsyncError(async(req,res) => {
    const { categoryId } = req.params
    const category = await categoryModel.findOne({ _id: categoryId })
    res.json({ category })
})

export const addCategory = catchAsyncError(async(req, res) => {
    const category = await categoryModel.create(req.body)
    res.status(201).json({category})
})

export const updateCategory = catchAsyncError(async (req, res) => {
    const { categoryId } = req.params
    const category = await categoryModel.findOneAndUpdate(
        { _id: categoryId },
        req.body,
        { new: true }
    )
    res.status(201).json({category})

})
export const deleteCategory = catchAsyncError(async (req, res) => {
    const { categoryId } = req.params
    const category = await categoryModel.findOneAndDelete({ _id: categoryId })
    res.json({category})
})