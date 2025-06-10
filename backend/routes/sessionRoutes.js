import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import {
  createSession,
  deleteSession,
  getMySessions,
  getSessionById,
} from '../controllers/sessionController.js';

const router = express.Router();

router.use(protect);
router.post('/create', createSession);
router.get('/my-sessions', getMySessions);
router.get('/:id', getSessionById);
router.delete('/:id', deleteSession);

export default router;
