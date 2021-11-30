import { Router } from 'express';
import { myChats, chatRoom } from '../controllers/chat.controllers';
import { tokenValidation } from '../lib/verifyToken';


const router = Router();

router.route('/:usr_name')
    .get(myChats);
router.route('/chat-room/:idConversacion')
    .get(chatRoom);


export default router;