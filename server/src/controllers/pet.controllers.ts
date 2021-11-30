import { Request, Response } from 'express';
import db from '../database';


export const myPets = async (req: Request, res: Response) => {
    const { usr_name } = req.params;
    const pets = await db.query('SELECT m.idMascota, m.usr_name, g.nombre as sexo, p.nombre as tipomascota, m.pet_name, m.descripcion, m.pet_image, m.chip FROM mascota as m JOIN petgender as g ON m.idPetGender = g.idPetGender JOIN tipomascota as p ON m.idTIpoMascota= p.idTipoMascota WHERE m.usr_name = ?', [usr_name]);
    if (pets.length > 0){
        return res.json(pets);
    } 
    res.status(404).json({message: 'Sin mascotas'});
};

export const addPet = async (req: Request, res: Response) => {
    const { usr_name, pet_name, pet_image, idTipoMascota, idPetGender, descripcion, chip} = req.body;
    const newPet = {
        usr_name,
        pet_name,
        pet_image,
        idTipoMascota,
        idPetGender,
        descripcion,
        chip
    }
    await db.query('INSERT INTO mascota SET ?', [newPet]);
    res.json(newPet);
};