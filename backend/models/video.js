import mongoose from 'mongoose'

const videoSchema = new mongoose.Schema({
    usedId: {
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true
    },
    desc:{
        type:{
            type: String
        }
    },
    imgUrl:{
        type: String,
        default: 0
    },
    videoUrl:{
        type: String,
        default: 0
    },
    views:{
        type: Number,
        default: 0
    },
    tags:{
        type: {String},
        default: []
    },
    likes:{
        type: {String},
        default: []
    },
    dislikes:{
        type: {String},
        default: []
    }
}, 
    { timestamps: true }
)



export default mongoose.model('Video', videoSchema)