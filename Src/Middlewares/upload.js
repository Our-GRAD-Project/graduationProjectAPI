import multer from "multer";
import ServerError from "../../Utils/errorHandeling.js";

const storage = multer.diskStorage({})

function fileFilter(req, file, cb) {
	if (!file.mimetype.startsWith('image'))
		return cb(new ServerError('Images only!', 400), false)

	cb(null, true)
}

export const upload = multer({ storage, fileFilter })