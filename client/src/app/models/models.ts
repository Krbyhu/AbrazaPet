export interface IUser {
    rut?: string;
    names?: string;
    lst_names?: string;
    usr_name?: string;
    mail?: string;
    pass?: string;
    idTipoUsuario?: number;
}

export interface IUserProfile {
    usr_name?: string;
    addrss?: string;
    contact_number?: number;
    profile_image?: string;
}

export interface IPets {
    usr_name?: string;
    idPetGender?: number;
    idTipoMascota?: number;
    pet_name?: string;
    descripcion?: string;
    pet_image?: string;
    chip?: string;
}
