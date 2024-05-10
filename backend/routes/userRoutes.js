import express from "express"
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {registerUser, logoutUser, authUser ,getMe} from '../controllers/userController.js';

router.post('/', registerUser)
router.post('/auth', authUser)
router.post('/logout', logoutUser )
router.get('/me', protect,getMe)


export default router