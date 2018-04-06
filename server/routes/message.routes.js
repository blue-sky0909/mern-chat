import { Router } from 'express';
import * as MessageController from '../controllers/message.controller';
const router = new Router();

router.route('/message').post(MessageController.getMessages);

export default router;