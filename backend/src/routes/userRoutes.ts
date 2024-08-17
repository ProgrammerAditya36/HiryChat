import {Router} from 'express';
const router = Router();  
import { registerUser, loginUser,  getUsers,getUser, updateUser } from '../controllers/userController';
import { newCoversation } from '../controllers/conversationController';
import { newMessage, getMessage, getMessagesAll } from '../controllers/messageController';
router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/all',getUsers);
router.get('/:phone',getUser);
router.put('/:phone',updateUser);
router.post('/conversation/add',newCoversation);
router.post('/message/new', newMessage);
router.get('/messages/all', getMessagesAll);

router.get('/message/:conversationId', getMessage);
export default router;