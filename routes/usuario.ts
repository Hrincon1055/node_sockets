import { Router } from 'express';
import { getUsuarios } from '../controllers/usuario';
const router = Router();
router.post('/', getUsuarios);
export default router;
