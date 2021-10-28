import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import * as model from '../../models/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URI = 'http://192.168.56.1:3000/api'

  constructor(private http: HttpClient) { }

  //Login

  logIn(user: model.IUser){
    return this.http.post(`${this.API_URI}/auth`, user, {observe : 'response'}).pipe(
        map(res => {
          localStorage.setItem('auth-token', res.headers.get('auth-token'));
          return res.body;
        }
      )
    )
  }

  logOut(){
    localStorage.removeItem('auth-token');
  }
}
