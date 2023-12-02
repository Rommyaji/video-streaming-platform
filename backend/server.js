import express from "express"
import mongoose from "mongoose"
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import userRoutes from './routes/users.js'
import videoRoutes from './routes/video.js'
import commentRoutes from './routes/comment.js'
import authRoutes from './routes/auth.js'

const app = express()
dotenv.config()

const connect = () => {
    mongoose.connect(process.env.MONGO).then(() => {
        console.log('Connected to Database');
    })
    .catch(err => {
        throw err
    })
}

app.use(cookieParser())
app.use(express.json())

app.use('/users', userRoutes)
app.use('/video', videoRoutes)
app.use('/comment', commentRoutes)
app.use('/auth', authRoutes)

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message
    })
})

app.listen(9100, connect(), console.log("server started.."))
