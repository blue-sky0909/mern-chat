import { Router } from 'express';
import * as MessageController from '../controllers/message.controller';
const router = new Router();

router.route('/message').get(MessageController.getMessages);

export default router;