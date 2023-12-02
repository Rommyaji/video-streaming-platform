import express from 'express'
import { update, deleteUser, getUser, subscribe, unsubscribe, like, dislike } from '../controllers/users.js'
import { verifyToken } from '../utils/verify.js'

const router = express.Router()


router.put('/:id', verifyToken, update)

router.delete('/:id', verifyToken, deleteUser)

router.get('/search/:id', getUser)

router.put('/:id', verifyToken, subscribe)

router.put('/:id', verifyToken, unsubscribe)

router.put('/:id', verifyToken, like)

router.put('/:id', verifyToken, dislike)



export default router