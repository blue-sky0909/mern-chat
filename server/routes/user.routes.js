import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
const router = new Router();

router.route('/auth/signin').post(UserController.signIn);
router.route('/auth/signup').post(UserController.signUp);
router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});
export default router;
