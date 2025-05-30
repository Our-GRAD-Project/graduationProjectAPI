import { catchAsyncError } from "../../../../Utils/errorHandeling.js"
import { createAudio } from "../../Audio/Utils/audioUtils.js";
import { createImage } from "../../Images/Utils/imageUtils.js"

export const attachImage = (bodyFieldName) =>
    catchAsyncError(async (req, res, next) => {
      if (!req.file) return next();
      const image = await createImage(req.file.path);
      req.body[bodyFieldName] = image._id;
      next();
    });

export const attachCoverImage = () =>
        catchAsyncError(
            async (req, res, next) => {
                if(!req.files?.coverImage) return next()
                const image = await createImage(req.files.coverImage[0].path)
                req.body.coverImage = image._id
                next()
    })
export const attachAudioFile = () =>
        catchAsyncError(
            async (req, res, next) => {
                if(!req.files?.audio) return next()
                const audio = await createAudio(req.files.audio[0].path)
                req.body.audio = audio._id
                next()
    })