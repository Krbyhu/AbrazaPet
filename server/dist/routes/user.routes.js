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
router.route('/register/first')
    .post(user_controllers_1.signupFirst);
router.route('/register/second')
    .post(user_controllers_1.signupSecond);
router.route('/profile/:usr_name')
    .get(verifyToken_1.tokenValidation, user_controllers_1.profile)
    .post(verifyToken_1.tokenValidation, user_controllers_1.profilePost)
    .put(verifyToken_1.tokenValidation, user_controllers_1.profileUpdate);
exports.default = router;
