import { Router } from 'express';
const router = Router();
import contactCtl from '../controllers/contact.controller.js';

router.get('/', (req, res) => {
	res.render("contact");
});
router.post('/', contactCtl.create);

export default router;

