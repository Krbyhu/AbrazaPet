"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_1 = require("../controllers/user.controllers");
const verifyToken_1 = require("../lib/verifyToken");
const router = (0, express_1.Router)();
router.route('/')
    .post(user_controllers_1.signin);
router.route('/register')
    .post(user_controllers_1.signup);
router.route('/register/:usr_name')
    .get(verifyToken_1.tokenValidation, user_controllers_1.completeReg)
    .post(verifyToken_1.tokenValidation, user_controllers_1.completeRegPost);
// router.route('/profile/:id')
//     .get(tokenValidation, profile)
//     .put(tokenValidation, profileUpdate)
exports.default = router;
