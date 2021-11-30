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
exports.completeProfile = exports.signin = exports.profileUpdate = exports.profilePost = exports.profile = exports.signupSecond = exports.signupFirst = exports.signup = void 0;
const database_1 = __importDefault(require("../database"));
const helpers_1 = require("../lib/helpers");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rut, names, lst_names, usr_name, mail, pass, idTipoUsuario } = req.body;
    const newUser = {
        rut,
        names,
        lst_names,
        usr_name,
        mail,
        pass,
        idTipoUsuario
    };
    newUser.pass = yield (0, helpers_1.encryptPassword)(newUser.pass);
    yield database_1.default.query('INSERT INTO usuario SET ?', [newUser]);
    const token = jsonwebtoken_1.default.sign({ rut: newUser.rut }, process.env.TOKEN_SECRET || 'TOKENSECRET');
    res.header('auth-token', token).json(newUser);
});
exports.signup = signup;
const signupFirst = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rut, mail } = req.body;
    const userMail = yield database_1.default.query('SELECT * FROM usuario WHERE mail = ?', [mail]);
    const userRut = yield database_1.default.query('SELECT * FROM usuario WHERE rut = ?', [rut]);
    if (userMail.length == 1 && userRut.length == 1) {
        res.status(404).json({ title: 'Correo electrónico y rut en uso', msg: 'El correo electrónico y rut que ingresaste ya están en uso. Intenta ingresando unos nuevos.' });
    }
    else if (userRut.length == 1) {
        res.status(404).json({ title: 'Rut en uso', msg: 'El rut que ingresaste ya están en uso. Intenta ingresando uno nuevo.' });
    }
    else if (userMail.length == 1) {
        res.status(404).json({ title: 'Correo electrónico en uso', msg: 'El correo electrónico que ingresaste ya está en uso. Intenta ingresando uno nuevo.' });
    }
    else {
        res.json(userMail);
    }
});
exports.signupFirst = signupFirst;
const signupSecond = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield database_1.default.query('SELECT * FROM usuario WHERE usr_name = ?', [req.body.usr_name]);
    if (user.length == 1) {
        res.status(404).json({ title: 'Nombre de usuario en uso', msg: 'El nombre de usuario que ingresaste ya está en uso. Intenta ingresando uno nuevo.' });
    }
    else {
        res.json(user);
    }
});
exports.signupSecond = signupSecond;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usr_name } = req.params;
    const user = yield database_1.default.query('SELECT u.names, u.lst_names, u.usr_name, u.mail, p.addrss, p.contact_number, p.profile_image FROM usuario AS u JOIN perfilusuario AS p ON u.usr_name = p.usr_name WHERE u.usr_name = ?', [usr_name]);
    if (user.length > 0) {
        return res.json(user[0]);
    }
    res.status(404).json({ message: 'Usuario no existe' });
});
exports.profile = profile;
const profilePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.profilePost = profilePost;
const profileUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usr_name } = req.params;
    yield database_1.default.query('UPDATE usuario SET ? WHERE usr_name = ?', [req.body[0], usr_name]);
    yield database_1.default.query('UPDATE perfilusuario SET ? WHERE usr_name = ?', [req.body[1], req.body[0].usr_name]);
    res.json({ message: 'Usuario modificado' });
});
exports.profileUpdate = profileUpdate;
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
const completeProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usr_name, addrss, contact_number, profile_image } = req.body;
    const userReg = {
        usr_name,
        addrss,
        contact_number,
        profile_image
    };
    yield database_1.default.query('INSERT INTO perfilusuario SET ?', [userReg]);
    res.json(userReg);
});
exports.completeProfile = completeProfile;
