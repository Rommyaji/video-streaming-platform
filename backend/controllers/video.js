import videoSchema from '../models/video.js'
import usersSchema from '../models/users.js'
import { createError } from '../utils/error.js'

export const addVideo = async (req, res, next) => {

    const newVideo = new videoSchema({ userId: req.user.id, ...req.body })

    try {
        const video = await newVideo.save()
        res.status(200).json(video)
    } catch(err) {
        next(err)
    }
}


export const getVideo = async (req, res, next) => {

    const { id } = req.params

    try {
        const video = await videoSchema.find(id)
        res.status(200).json(video)
    } catch(err) {
        next(err)
    }
}


export const updateVideo = async (req, res, next) => {
    try {
        const video = await videoSchema.findById(req.params.id)
        if(!video) return next(createError(404, 'video not found'))

        if(req.user.id === video.userId) {
            const updated = await videoSchema.findByIdAndUpdate(id, 
                { $set: res.body }, { new: true }
            )
            res.status(200).json(updated)
        }
        next(createError(403, 'unauthorized'))
    } catch(err) {
        next(err)
    }
}


export const deleteVideo = async (req, res, next) => {

    const { id } = req.params

    try {
        const video = await videoSchema.findById(id)
        if(!video) return next(createError(404, 'video not found'))

        if(req.user.id === video.userId) {
            await videoSchema.findByIdAndDelete(id)
            res.status(200).json('video deleted')
        }
        next(createError(403, 'unauthorized'))
    } catch(err) {
        next(err)
    }
}


export const addView = async (req, res, next) => {

    const { id } = req.params

    try {
        await videoSchema.findByIdAndUpdate(id, {
            $inc: {views}
        })
        res.status(200).json("views increased")
    } catch(err) {
        next(err)
    }
}


export const sub = async (req, res, next) => {
    try{
        const users = await usersSchema.findById(req.user.id)
        const subscribed = users.subscribedUsers

        const list = await Promise.all(
            subscribed.map((channelId) => {
                return videoSchema.find({ userId: channelId })
            })
        )

        res.status(200).json(list.flat((a, b) => b.createdAt - a.createdAt))
    } catch(err) {
        next(err)
    }
}


export const getByTag = async (req, res, next) => {

    const { tags } = req.query.split(",")
    console.log(tags);

    try {
        const video = await videoSchema.find({ tags: {$in: tags}})
        res.status(200).json(video)
    } catch(err) {
        next(err)
    }
}


export const search = async (req, res, next) => {

    const { q }  = req.query

    try {
        const video =await videoSchema.find({title: { $regex: q, $options: 'i' }})
        res.status(200).json(video)
    } catch(err) {
        next(err)
    }
}


export const trend = async (req, res, next) => {
    try {
        const video = await videoSchema.find().sort({ views: 1 })
        res.status(200).json(video)
    } catch(err) {
        next(err)
    }
}


export const random = async (req, res, next) => {
    try {
        const video =await videoSchema.aggregate([{ $sample: { size: 50 }}])
        res.status(200).json(video)
    } catch(err) {
        next(err)
    }
}

