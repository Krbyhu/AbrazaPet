import { Router } from 'express';
import { profile, profilePost, profileUpdate, signin, signup, signupFirst, signupSecond } from '../controllers/user.controllers';
import { tokenValidation } from '../lib/verifyToken';


const router = Router();

router.route('/')
    .post(signin);
router.route('/register')
    .post(signup);
router.route('/register/first')
    .post(signupFirst);
router.route('/register/second')
    .post(signupSecond);
router.route('/profile/:usr_name')
    .get(tokenValidation, profile)
    .post(tokenValidation, profilePost)
    .put(tokenValidation, profileUpdate);


export default router;