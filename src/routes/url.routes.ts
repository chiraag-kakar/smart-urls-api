import express from 'express';
import { auth } from '../middlewares/authMiddleware';
import { validateUrl } from '../middlewares/validateUrl';
import * as urlController from '../controllers/urlController';
const router = express.Router();
router.post('/url/quick_create', validateUrl, urlController.quickCreate);
router.post('/url/create', auth, validateUrl, urlController.createShortUrl);
router.get('/url/dashboard', auth, urlController.getDashboard);
router.get('/url/search', auth, urlController.getUrl);
router.delete('/url/delete/:urlId', auth, urlController.deleteUrl);
router.put('/url/redirect/:shortUrl', urlController.redirectToUrl);
export = router;
