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
exports.myPets = void 0;
const database_1 = __importDefault(require("../database"));
const myPets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usr_name } = req.params;
    const user = yield database_1.default.query('SELECT u.names, u.lst_names, u.usr_name, u.mail, p.addrss, p.contact_number, p.profile_image FROM usuario AS u JOIN perfilusuario AS p ON u.usr_name = p.usr_name WHERE u.usr_name = ?', [usr_name]);
    if (user.length > 0) {
        return res.json(user[0]);
    }
    res.status(404).json({ message: 'Usuario no existe' });
});
exports.myPets = myPets;
