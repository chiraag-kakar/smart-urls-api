import express from 'express';
import healthController from '../controllers/healthController';

const router = express.Router();

router.get('/ping', healthController.serverHealthCheck);

export = router;
