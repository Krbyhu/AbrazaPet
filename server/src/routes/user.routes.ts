import { Router } from 'express';
import { completeReg, completeRegPost, signin, signup } from '../controllers/user.controllers';
import { tokenValidation } from '../lib/verifyToken';


const router = Router();

router.route('/')
    .post(signin);
router.route('/register')
    .post(signup);
router.route('/register/:usr_name')
    .get(tokenValidation, completeReg)
    .post(tokenValidation, completeRegPost);
// router.route('/profile/:id')
//     .get(tokenValidation, profile)
//     .put(tokenValidation, profileUpdate)


export default router;