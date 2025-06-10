import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import {
  addQuestionToSession,
  togglePinQuestion,
  updateQuestionNote,
} from '../controllers/questionController.js';

const router = express.Router();

router.use(protect);
router.post('/add', addQuestionToSession);
router.post('/:id/pin', togglePinQuestion);
router.post('/:id/note', updateQuestionNote);

export default router;
