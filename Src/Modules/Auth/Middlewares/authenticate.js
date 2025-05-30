import jwt from 'jsonwebtoken'
import ServerError from '../../../../Utils/errorHandeling.js'

export const authenticate = (req, res, next) => {
	const token = req.header('token')

	if (!token || !token.startsWith('Bearer'))
		throw new ServerError('Unauthorized', 401)

	const bearerToken = token.split(' ')[1]

	try {
		const decoded = jwt.verify(bearerToken, process.env.TOKEN_SECRET)
		req.user = decoded
		next()
	} catch (error) {
		throw new ServerError(error.message, 498)
	}
}