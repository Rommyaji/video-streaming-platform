import usersSchema from '../models/users.js'
import videoSchema from '../models/video.js'
import { createError } from "../utils/error.js"

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
        await usersSchema.findByIdAndUpdate(req.user.id, {
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
        await usersSchema.findByIdAndUpdate(req.user.id, {
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

    const { id } = req.user
    const { videoId } = req.params

    try {
        await videoSchema.findByIdAndUpdate(videoId, 
            { $addToSet: { likes: id } },
            { $pull: { dislikes: id }}
        )
        res.status(200).json('liked')
    } catch(err) {
        next(err)
    }
}


export const dislike = async (req, res, next) => {
    const { id } = req.user;
    const { videoId } = req.params;

    try {
        await videoSchema.findByIdAndUpdate(
            videoId,
            { $addToSet: { dislikes: id } },
            { $pull: { likes: id } }
        );
        res.status(200).json('disliked');
    } catch (err) {
        next(err);
    }
}
