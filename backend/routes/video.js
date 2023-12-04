import express from "express"
import { addVideo, getVideo, updateVideo, deleteVideo, addView, trend, random, sub } from '../controllers/video.js'
import { verifyToken } from '../utils/verify.js'

const router = express.Router()


router.post('/', verifyToken, addVideo)

router.get('/search/:id', getVideo)

router.put('/:id', verifyToken, updateVideo)

router.delete('/:id', verifyToken, deleteVideo)

router.get('/sub', verifyToken, sub)

router.put('/view/:id', addView)

router.put('/trend', trend)

router.put('/random', random)


export default router