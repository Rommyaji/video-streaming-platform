import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    usedId: {
        type: String,
        required: true,
    },
    videoId: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
}, 
    { timestamps: true }
)



export default mongoose.model('comment', commentSchema)