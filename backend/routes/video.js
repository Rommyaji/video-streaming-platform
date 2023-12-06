import express from "express"
import { addVideo, getVideo, updateVideo, deleteVideo, addView, sub, getByTag, search, trend, random } from '../controllers/video.js'
import { verifyToken } from '../utils/verify.js'

const router = express.Router()


router.post('/', verifyToken, addVideo)

router.get('/search/:id', getVideo)

router.put('/:id', verifyToken, updateVideo)

router.delete('/:id', verifyToken, deleteVideo)

router.put('/view/:id', addView)

router.get('/sub', verifyToken, sub)

router.get('/tags', getByTag)

router.get('/search', search)

router.get('/trend', trend)

router.get('/random', random)


export default router