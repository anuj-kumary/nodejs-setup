import express from 'express';
import { createUser } from '../controllers/userController';

const router = express.Router();

// Route for creating a user
router.post('/users', createUser);


export default router;
