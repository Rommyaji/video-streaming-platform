import express from "express"
import { addComment, deleteComment, getComment, updateComment } from '../controllers/comment.js'
import { verifyToken } from '../utils/verify.js'

const router = express.Router()


router.post('/', verifyToken, addComment)

router.delete('/:id', verifyToken, deleteComment)

router.get('/:videoId', getComment)



export default router