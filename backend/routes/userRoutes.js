import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { deleteMe, getMe, updateMe } from '../controllers/userController.js';
import { upload } from '../middlewares/uploadMiddleware.js';
import { updatePassword } from '../controllers/authController.js';

const router = express.Router();

router.use(protect);

router.get('/getMe', getMe);
router.patch('/updateMe', upload.single('profileImageUrl'), updateMe);
router.patch('/updateMyPassword', updatePassword);

router.delete('/deleteMe', deleteMe);

export default router;
