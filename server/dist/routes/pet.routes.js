"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pet_controllers_1 = require("../controllers/pet.controllers");
const verifyToken_1 = require("../lib/verifyToken");
const router = (0, express_1.Router)();
router.route('/:usr_name')
    .get(verifyToken_1.tokenValidation, pet_controllers_1.myPets);
router.route('/addPet')
    .post(verifyToken_1.tokenValidation, pet_controllers_1.addPet);
exports.default = router;
