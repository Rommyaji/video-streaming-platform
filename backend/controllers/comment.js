import commentSchema from '../models/comment.js'
import videoSchema from '../models/video.js'
import { createError } from '../utils/error.js'


export const addComment = async (req, res, next) => {

    const { id } = req.user
    const newComment = new commentSchema({ userId: id, ...req.body})

    try {
        const comment = await newComment.save()
        res.status(200).json(comment)
    } catch(err) {
        next(err)
    }
}


export const deleteComment = async (req, res, next) => {
    try {
        const comment = await commentSchema.findById(req.params.id)
        const video = await videoSchema.findById(req.params.id)

        if(req.user.id === comment.userId || req.user.id === video.userId) {
            await commentSchema.findOneAndDelete(req.params.id)
            res.status(200).json('delete comment successfully')
        } else {
            return next(createError(403, "unauthorized, cannot delete comment"))
        }
    } catch(err) {
        next(err)
    }
}


export const getComment = async (req, res, next) => {

    const { videoId } = req.params

    try {
        const comment = await commentSchema.find({ videoId: videoId })
        res.status(200).json(comment)
    } catch(err) {
        next(err)
    }
}
