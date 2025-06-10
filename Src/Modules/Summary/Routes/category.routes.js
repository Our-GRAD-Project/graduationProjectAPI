import { Router } from "express";
import { addCategory, deleteCategory, getCategories, getCategory, updateCategory } from "../Controllers/category.controller.js";
const router = Router()

router.route('/')
    .get(getCategories)
    .post(
        // validate(addCategorySchema),
        addCategory
)
    
router.route('/:categoryId')
    .get(
        // validate(getCategorySchema),
        getCategory
    )
    .put(
        // validate(updateCategorySchema),
        updateCategory
    )
    .delete(
        // validate(deleteCategorySchema),
        deleteCategory
    )




export default router