import { Router } from 'express';
const router = Router();
import loginCtl from '../controllers/login.controller.js';
 
/* POST programming language */
router.post('/', loginCtl.login);

export default router;
