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

  signUpFirst(user: model.IUser){
    return this.http.post(`${this.API_URI}/auth/register/first`, user, {observe : 'response'}).pipe(
      map(res => {
        return res.body;
        }
      )
    )
  }

  signUpSecond(user: model.IUser){
    return this.http.post(`${this.API_URI}/auth/register/second`, user, {observe : 'response'}).pipe(
      map(res => {
        return res.body;
        }
      )
    )
  }

  signUp(user: model.IUser){
    return this.http.post(`${this.API_URI}/auth/register`, user, {observe : 'response'}).pipe(
      map(res => {
        localStorage.setItem('auth-token', res.headers.get('auth-token'));
        return res.body;
        }
      )
    )
  }

  profile(usr_name: string){
    return this.http.get(`${this.API_URI}/auth/profile/${usr_name}`);
  }

  updateProfile(usr_name: string|number, updatedUser: model.IUser, updatedProfile: model.IUserProfile): Observable<model.IUser> {
    return this.http.put(`${this.API_URI}/auth/profile/${usr_name}`, [updatedUser, updatedProfile]);
  }

  completeProfile(user: model.IUserProfile){
    return this.http.post(`${this.API_URI}/auth/complete-profile`, user, {observe : 'response'}).pipe(
      map(res => {
        return res.body;
        }
      )
    )
  }

  logOut(){
    localStorage.removeItem('auth-token');
    localStorage.removeItem('usr_name');
  }
}
