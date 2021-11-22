import { Request, Response } from 'express';
import db from '../database';

import { encryptPassword, matchPassword } from '../lib/helpers';

import jwt from 'jsonwebtoken';

export const signup = async (req: Request, res: Response) => {
    const { rut, names, lst_names, usr_name, mail, pass, idTipoUsuario} = req.body;
    const newUser = {
        rut,
        names,
        lst_names,
        usr_name,
        mail,
        pass,
        idTipoUsuario
    }
    newUser.pass = await encryptPassword(newUser.pass);
    await db.query('INSERT INTO usuario SET ?', [newUser]);
    res.json(newUser);
};

export const signupFirst = async (req: Request, res: Response) => {
    const { rut, mail } = req.body;
    const userMail = await db.query('SELECT * FROM usuario WHERE mail = ?', [mail])
    const userRut = await db.query('SELECT * FROM usuario WHERE rut = ?', [rut])
    if(userMail.length == 1 && userRut.length == 1) {
        res.status(404).json({title: 'Correo electrónico y rut en uso', msg: 'El correo electrónico y rut que ingresaste ya están en uso. Intenta ingresando unos nuevos.'});
    } else if (userRut.length == 1){
        res.status(404).json({title: 'Rut en uso', msg: 'El rut que ingresaste ya están en uso. Intenta ingresando uno nuevo.'});
    } else if (userMail.length == 1) {
        res.status(404).json({title: 'Correo electrónico en uso', msg: 'El correo electrónico que ingresaste ya está en uso. Intenta ingresando uno nuevo.'});
    } else {
        res.json(userMail);
    }
};

export const signupSecond = async (req: Request, res: Response) => {
    const user = await db.query('SELECT * FROM usuario WHERE usr_name = ?', [req.body.usr_name])
    if(user.length == 1) {
        res.status(404).json({title: 'Nombre de usuario en uso', msg: 'El nombre de usuario que ingresaste ya está en uso. Intenta ingresando uno nuevo.'});
    } else {
        res.json(user);
    }
};

export const profile = async (req: Request, res: Response) => {
    const { usr_name } = req.params;
    const user = await db.query('SELECT u.names, u.lst_names, u.usr_name, u.mail, p.addrss, p.contact_number, p.profile_image FROM usuario AS u JOIN perfilusuario AS p ON u.usr_name = p.usr_name WHERE u.usr_name = ?', [usr_name]);
    if (user.length > 0){
        return res.json(user[0]);
    }
    res.status(404).json({message: 'Usuario no existe'});
};

export const profilePost = async (req: Request, res: Response) => {
    const { addrss, contact_number, profile_image} = req.body;
    const userReg = {
        usr_name: req.params.usr_name,
        addrss,
        contact_number,
        profile_image
    }
    await db.query('INSERT INTO perfilusuario SET ?', [userReg]);
    res.json(userReg);
};

export const profileUpdate = async (req: Request, res: Response) => {
    const { usr_name } = req.params;
    await db.query('UPDATE usuario SET ? WHERE usr_name = ?', [req.body[0], usr_name]);
    await db.query('UPDATE perfilusuario SET ? WHERE usr_name = ?', [req.body[1], req.body[0].usr_name])
    res.json({message: 'Usuario modificado'});
};

export const signin = async (req: Request, res: Response) => {
    if(req.body.mail) {
        const rows = await db.query('SELECT * FROM usuario WHERE mail = ?', [req.body.mail]);
        const user = rows[0];
        if (rows.length > 0) {
            const validPass = await matchPassword(req.body.pass, user.pass);
            if (!validPass) {
                return res.status(400).json({title: 'Contraseña incorrecta', msg:'Parece que la contraseña que ingresaste no es correcta. Podemos ayudarte a iniciar sesión si olvidaste tu contraseña'});
            }
        } else {
            return res.status(400).json({title:'Correo electrónico incorrecto', msg:'Parece que el correo electrónico que ingresaste no pertenece a ninguna cuenta. Comprueba tu dirección de correo electrónico y vuelve a intentarlo.'});
        }

        const token = jwt.sign({ rut: user.rut }, process.env.TOKEN_SECRET || 'TOKENSECRET');
        res.header('auth-token', token).json(user);

    } else {
        const rows = await db.query('SELECT * FROM usuario WHERE usr_name = ?', [req.body.usr_name]);
        const user = rows[0];
        if (rows.length > 0) {
            const validPass = await matchPassword(req.body.pass, user.pass);
            if (!validPass) {
                return res.status(400).json({title: 'Contraseña incorrecta', msg:'Parece que la contraseña que ingresaste no es correcta. Podemos ayudarte a iniciar sesión si olvidaste tu contraseña'});
            }
        } else {
            return res.status(400).json({title:'Nombre de usuario incorrecto', msg:'Parece que el nombre de usuario que ingresaste no pertenece a ninguna cuenta. Comprueba tu nombre de usuario y vuelve a intentarlo.'});
        }
        const token = jwt.sign({ rut: user.rut }, process.env.TOKEN_SECRET || 'TOKENSECRET');
        res.header('auth-token', token).json(user);
    }
};
