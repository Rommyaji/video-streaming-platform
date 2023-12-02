import videoSchema from '../models/video.js'
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
    const { id } = req.params

    try {
        const video = await videoSchema.findById(id)
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


export const sub = async (req, res, next) => {

}


export const addView = async (req, res, next) => {

}


export const trend = async (req, res, next) => {

}


export const random = async (req, res, next) => {

}