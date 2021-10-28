import { Request, Response } from 'express';
import db from '../database';

import { encryptPassword, matchPassword } from '../lib/helpers';

import jwt from 'jsonwebtoken';

export const signup = async (req: Request, res: Response) => {
    const { rut, names, lst_names, usr_name, mail, pass } = req.body;
    const newUser = {
        rut,
        names,
        lst_names,
        usr_name,
        mail,
        pass,
        idTipoUsuario: 1
    }
    newUser.pass = await encryptPassword(newUser.pass);
    await db.query('INSERT INTO usuario SET ?', [newUser]);
    const token = jwt.sign({ rut: newUser.rut }, process.env.TOKEN_SECRET || 'TOKENSECRET');
    res.header('auth-token', token).json(newUser);
};

export const completeReg = async (req: Request, res: Response) => {
    const { usr_name } = req.params;
    const user = await db.query('SELECT rut, names, lst_names, usr_name, mail FROM usuario WHERE usr_name = ?', [usr_name]);
    res.json(user);
};

export const completeRegPost = async (req: Request, res: Response) => {
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
