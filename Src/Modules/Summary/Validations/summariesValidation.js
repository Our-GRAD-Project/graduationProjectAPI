import Joi from "joi";





export const addSummarySchema = Joi.object({
body:{
    title:Joi.string().min(2).max(50),
    author:Joi.string().min(2).max(50),
    description:Joi.string().min(2).max(500),
    content:Joi.string().min(2),
    language:Joi.string().min(2).max(50),
    category_id:Joi.string().min(2).max(50),
    audio:Joi.string().hex().length(24),
},
params:{},
query:{},
files:Joi.object()
})