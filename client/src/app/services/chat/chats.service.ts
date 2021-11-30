import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import * as model from '../../models/models';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  constructor(private http: HttpClient) { }

  API_URI = 'http://192.168.56.1:3000/api'

  myChats(usr_name: string){
    return this.http.get(`${this.API_URI}/chats/${usr_name}`);
  }

  chatRoom(idConversacion: string){
    return this.http.get(`${this.API_URI}/chats/chat-room/${idConversacion}`);
  }
}
