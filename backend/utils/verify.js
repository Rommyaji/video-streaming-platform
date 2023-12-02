import jwt from 'jsonwebtoken'
import { createError } from '../utils/error.js'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    if(!token) return next(createError(401, "Unauthorized"))

    jwt.verify(token, process.env.SECRET_KEY, (err, user) =>{
        if(err) return next(createError(403, "Invalid token!"))
        req.user = user
    next()
    })
}