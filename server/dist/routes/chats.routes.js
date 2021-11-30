"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_controllers_1 = require("../controllers/chat.controllers");
const router = (0, express_1.Router)();
router.route('/:usr_name')
    .get(chat_controllers_1.myChats);
router.route('/chat-room/:idConversacion')
    .get(chat_controllers_1.chatRoom);
exports.default = router;
