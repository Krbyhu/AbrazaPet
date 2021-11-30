"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRoom = exports.myChats = void 0;
const database_1 = __importDefault(require("../database"));
const myChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usr_name } = req.params;
    const chatsUser = yield database_1.default.query('select c.idConversacion, p.usr_name, p.profile_image from perfilusuario as p join conversacion as c on p.usr_name = c.usr_name0 OR p.usr_name = c.usr_name1 WHERE p.usr_name IN (select case when usr_name0 = ? THEN usr_name1 ELSE usr_name0 END as usr FROM conversacion) group by p.usr_name', [usr_name]);
    if (chatsUser.length > 0) {
        return res.json(chatsUser);
    }
    res.status(404).json({ message: 'Sin chats' });
});
exports.myChats = myChats;
const chatRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params.idConversacion;
    const splitted = params.split("-", 2);
    const idConversacion = splitted[0];
    const usr_name = splitted[1];
    const chatRoomUser = yield database_1.default.query('select p.usr_name, p.profile_image from perfilusuario as p join conversacion as c on (p.usr_name IN (select case when usr_name0 = ? THEN usr_name1 ELSE usr_name0 END as usr FROM conversacion WHERE idConversacion = ?)) group by p.usr_name', [usr_name, idConversacion]);
    if (chatRoomUser.length > 0) {
        return res.json(chatRoomUser);
    }
    res.status(404).json({ message: 'Sin chats' });
});
exports.chatRoom = chatRoom;
