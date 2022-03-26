import express from 'express';
// import extractJWT from '../middlewares/extractJWT';
import {auth} from '../middlewares/authMiddleware';
import * as userController from '../controllers/userController';
const router = express.Router();

router.get('/validate', auth, userController.validateToken);
router.post('/registerUser', userController.registerUser); // to register user
router.post('/loginUser', userController.loginUser); // to login user

export = router;
