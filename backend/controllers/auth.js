import bcrypt from 'bcrypt'
import mongoose from "mongoose"
import jwt from 'jsonwebtoken'
import usersSchema from '../models/users.js'
import { createError } from '../utils/error.js'

export const signup = async (req, res, next) => {

    const { name, password } = req.body

    try {
        const encrypt = await bcrypt.hash(password, 12)
        const users = await new usersSchema({name, password: encrypt})

        await users.save()
        res.status(200).send('successfully added user')
    } catch(err) {
        next(err)
    }
}


export const signin = async (req, res, next) => {

    const { name, password } = req.body

    try {
        const users = await usersSchema.findOne({ name: name })
        if(!users) return next(createError(404, 'users not found'))

        const isCorrect = await bcrypt.compare(password, users.password)
        if(!isCorrect) return next(createError(404, 'wrong password'))

        const token = jwt.sign({id: users._id}, process.env.SECRET_KEY)
        const { password: usersPassword, ...others} = users._doc

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(
            others
        )

    } catch(err) {
        next(err)
    }
}


