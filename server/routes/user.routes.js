import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
const router = new Router();

router.route('/auth/signin').post(UserController.signIn);
router.route('/auth/signup').post(UserController.signUp);

export default router;
