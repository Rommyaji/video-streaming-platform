import { createError } from "../utils/error.js"
import usersSchema from '../models/users.js'

export const update = async (req, res, next) => {
    if(req.params.id === req.user.id) {
        try {
            const users = await usersSchema.findByIdAndUpdate(req.params.id, 
                { $set: res.body }, { new: true}
            )
            res.status(200).json(users)
        } catch(err) {
            next(err)
        }
    } else {
        return next(createError(403, 'Unauthorized, no permission to update this user'))
    }
}


export const deleteUser = async (req, res, next) => {
    if(req.params.id === req.user.id) {
        try {
            await usersSchema.findByIdAndDelete(req.params.id)
            res.status(200).json('Account deleted')
        } catch(err) {
            next(err)
        }
    } else {
        return next(createError(403, 'Unauthorized, no permission to delete account'))
    }
}


export const getUser = async (req, res, next) => {

    const { id } = req.params

    try {
        const users = await usersSchema.findById(id)
        
        res.status(200).json(users)
    } catch(err) {
        next(err)
    }
}


export const subscribe = async (req, res, next) => {

    try {
        await usersSchema.findById(req.user.id, {
            $push: { subscribedUsers: req.params.id }
        })

        await usersSchema.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 }
        })
        res.status(200).json('subscribed')
    } catch(err) {
        next(err)
    }
}


export const unsubscribe = async (req, res, next) => {
    
    try {
        await usersSchema.findById(req.user.id, {
            $pull: { subscribedUsers: req.params.id }
        })

        await usersSchema.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: -1 }
        })
        res.status(200).json('unsubs')
    } catch(err) {
        next(err)
    }
}


export const like = async (req, res, next) => {
    try {

    } catch(err) {
        next(err)
    }
}


export const dislike = async (req, res, next) => {
    try {

    } catch(err) {
        next(err)
    }
}

