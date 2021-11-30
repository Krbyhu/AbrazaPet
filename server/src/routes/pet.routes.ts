import { Router } from 'express';
import { myPets, addPet} from '../controllers/pet.controllers';
import { tokenValidation } from '../lib/verifyToken';


const router = Router();

router.route('/:usr_name')
    .get(tokenValidation, myPets);
router.route('/addPet')
    .post(tokenValidation, addPet)


export default router;