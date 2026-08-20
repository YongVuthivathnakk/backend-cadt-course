import express from 'express';
import { createNewUser, getAllUsers, getUser, removeUser, updateExistingUser } from '../controllers/userController.js';



const router = express.Router();


router.get('/', getAllUsers)
router.get('/:id', getUser)
router.post('/', createNewUser)
router.put("/:id", updateExistingUser)
router.delete("/:id", removeUser)

export default router;