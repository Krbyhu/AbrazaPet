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
exports.addPet = exports.myPets = void 0;
const database_1 = __importDefault(require("../database"));
const myPets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usr_name } = req.params;
    const pets = yield database_1.default.query('SELECT m.idMascota, m.usr_name, g.nombre as sexo, p.nombre as tipomascota, m.pet_name, m.descripcion, m.pet_image, m.chip FROM mascota as m JOIN petgender as g ON m.idPetGender = g.idPetGender JOIN tipomascota as p ON m.idTIpoMascota= p.idTipoMascota WHERE m.usr_name = ?', [usr_name]);
    if (pets.length > 0) {
        return res.json(pets);
    }
    res.status(404).json({ message: 'Sin mascotas' });
});
exports.myPets = myPets;
const addPet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usr_name, pet_name, pet_image, idTipoMascota, idPetGender, descripcion, chip } = req.body;
    const newPet = {
        usr_name,
        pet_name,
        pet_image,
        idTipoMascota,
        idPetGender,
        descripcion,
        chip
    };
    yield database_1.default.query('INSERT INTO mascota SET ?', [newPet]);
    res.json(newPet);
});
exports.addPet = addPet;
