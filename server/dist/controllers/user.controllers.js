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
exports.signin = exports.completeRegPost = exports.completeReg = exports.signup = void 0;
const database_1 = __importDefault(require("../database"));
const helpers_1 = require("../lib/helpers");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rut, names, lst_names, usr_name, mail, pass } = req.body;
    const newUser = {
        rut,
        names,
        lst_names,
        usr_name,
        mail,
        pass,
        idTipoUsuario: 1
    };
    newUser.pass = yield (0, helpers_1.encryptPassword)(newUser.pass);
    yield database_1.default.query('INSERT INTO usuario SET ?', [newUser]);
    const token = jsonwebtoken_1.default.sign({ rut: newUser.rut }, process.env.TOKEN_SECRET || 'TOKENSECRET');
    res.header('auth-token', token).json(newUser);
});
exports.signup = signup;
const completeReg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usr_name } = req.params;
    const user = yield database_1.default.query('SELECT rut, names, lst_names, usr_name, mail FROM usuario WHERE usr_name = ?', [usr_name]);
    res.json(user);
});
exports.completeReg = completeReg;
const completeRegPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { addrss, contact_number, profile_image } = req.body;
    const userReg = {
        usr_name: req.params.usr_name,
        addrss,
        contact_number,
        profile_image
    };
    yield database_1.default.query('INSERT INTO perfilusuario SET ?', [userReg]);
    res.json(userReg);
});
exports.completeRegPost = completeRegPost;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.mail) {
        const rows = yield database_1.default.query('SELECT * FROM usuario WHERE mail = ?', [req.body.mail]);
        const user = rows[0];
        if (rows.length > 0) {
            const validPass = yield (0, helpers_1.matchPassword)(req.body.pass, user.pass);
            if (!validPass) {
                return res.status(400).json({ title: 'Contraseña incorrecta', msg: 'Parece que la contraseña que ingresaste no es correcta. Podemos ayudarte a iniciar sesión si olvidaste tu contraseña' });
            }
        }
        else {
            return res.status(400).json({ title: 'Correo electrónico incorrecto', msg: 'Parece que el correo electrónico que ingresaste no pertenece a ninguna cuenta. Comprueba tu dirección de correo electrónico y vuelve a intentarlo.' });
        }
        const token = jsonwebtoken_1.default.sign({ rut: user.rut }, process.env.TOKEN_SECRET || 'TOKENSECRET');
        res.header('auth-token', token).json(user);
    }
    else {
        const rows = yield database_1.default.query('SELECT * FROM usuario WHERE usr_name = ?', [req.body.usr_name]);
        const user = rows[0];
        if (rows.length > 0) {
            const validPass = yield (0, helpers_1.matchPassword)(req.body.pass, user.pass);
            if (!validPass) {
                return res.status(400).json({ title: 'Contraseña incorrecta', msg: 'Parece que la contraseña que ingresaste no es correcta. Podemos ayudarte a iniciar sesión si olvidaste tu contraseña' });
            }
        }
        else {
            return res.status(400).json({ title: 'Nombre de usuario incorrecto', msg: 'Parece que el nombre de usuario que ingresaste no pertenece a ninguna cuenta. Comprueba tu nombre de usuario y vuelve a intentarlo.' });
        }
        const token = jsonwebtoken_1.default.sign({ rut: user.rut }, process.env.TOKEN_SECRET || 'TOKENSECRET');
        res.header('auth-token', token).json(user);
    }
});
exports.signin = signin;
