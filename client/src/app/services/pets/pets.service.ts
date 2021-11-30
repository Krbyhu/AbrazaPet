import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import * as model from '../../models/models';

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  API_URI = 'http://192.168.56.1:3000/api'

  constructor(private http: HttpClient) { }

  myPets(usr_name: string){
    return this.http.get(`${this.API_URI}/pets/${usr_name}`);
  }

  AddPet(pet: model.IPets){
    return this.http.post(`${this.API_URI}/pets/addPet`, pet, {observe : 'response'}).pipe(
      map(res => {
        return res.body;
        }
      )
    )
  }
}
