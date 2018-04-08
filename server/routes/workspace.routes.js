import { Router } from 'express';
import * as WorkspaceController from '../controllers/workspace.controller';
const router = new Router();

router.route('/workspace/create').post(WorkspaceController.create);
router.route('/workspace/get').get(WorkspaceController.list);
router.route('/workspace/confirm').post(WorkspaceController.confirm);
export default router;
