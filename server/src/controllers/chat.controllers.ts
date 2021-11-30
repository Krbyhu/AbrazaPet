import { Request, Response } from 'express';
import db from '../database';


export const myChats = async (req: Request, res: Response) => {
    const { usr_name } = req.params;
    const chatsUser = await db.query('select c.idConversacion, p.usr_name, p.profile_image from perfilusuario as p join conversacion as c on p.usr_name = c.usr_name0 OR p.usr_name = c.usr_name1 WHERE p.usr_name IN (select case when usr_name0 = ? THEN usr_name1 ELSE usr_name0 END as usr FROM conversacion) group by p.usr_name', [usr_name]);

    if (chatsUser.length > 0){
        return res.json(chatsUser);
    }
    res.status(404).json({message: 'Sin chats'});
};

export const chatRoom = async (req: Request, res: Response) => {
    const params = req.params.idConversacion;
    const splitted = params.split("-", 2)
    const idConversacion = splitted[0]
    const usr_name = splitted[1]

    const chatRoomUser = await db.query('select p.usr_name, p.profile_image from perfilusuario as p join conversacion as c on (p.usr_name IN (select case when usr_name0 = ? THEN usr_name1 ELSE usr_name0 END as usr FROM conversacion WHERE idConversacion = ?)) group by p.usr_name', [usr_name, idConversacion]);

    if (chatRoomUser.length > 0){
        return res.json(chatRoomUser);
    }
    res.status(404).json({message: 'Sin chats'});
};