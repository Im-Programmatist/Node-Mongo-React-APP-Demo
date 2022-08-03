import { Router } from 'express';
const router = Router();
import registrationCtl from '../controllers/registration.controller.js';
 
/* POST programming language */
router.post('/', registrationCtl.create);

export default router;
