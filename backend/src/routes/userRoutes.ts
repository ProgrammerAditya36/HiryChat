import {Router} from 'express';
const router = Router();  
import { registerUser, loginUser,  getUsers,getUser, updateUser } from '../controllers/userController';
router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/all',getUsers);
router.get('/:phone',getUser);
router.put('/:phone',updateUser);
export default router;