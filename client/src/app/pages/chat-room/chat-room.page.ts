import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, IonContent } from '@ionic/angular';

import { ChatsService } from '../../services/chat/chats.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.page.html',
  styleUrls: ['./chat-room.page.scss'],
})
export class ChatRoomPage implements OnInit {

  constructor(private chatService: ChatsService, private router: Router, public actionSheetController: ActionSheetController, private activedRoute: ActivatedRoute) { }

  params = this.activedRoute.snapshot.params;
  usr_name = '';
  chat: any = [];

  messages = [
  {
    user: localStorage.getItem('usr_name'),
    createdAt: 1554090856000,
    msg: 'Mensaje de prueba'
  },
  {
    user: '',
    createdAt: 1554090956000,
    msg: 'Mensaje de prueba2'
  }
  ];

  currentUser = localStorage.getItem('usr_name');
  newMsg = '';
  @ViewChild(IonContent) content: IonContent

  ngOnInit() {
    this.getChatRoom();
    this.usr_name = localStorage.getItem('usr_name');
  }

  ionicViewWillEnter() {
    this.ngOnInit();
  }

  ionicViewDidEnter() {
    this.ngOnInit();
  }

  getChatRoom() {
    if (this.params.idConversacion) {
      this.chatService.chatRoom(this.params.idConversacion).subscribe(
        res => {
          this.chat = res[0];
          this.messages[1].user = this.chat.usr_name
        },
        err => console.error(err)
      )
    }
  }

  sendMessage() {
    this.messages.push({
      user: localStorage.getItem('usr_name'),
      createdAt: new Date().getTime(),
      msg: this.newMsg
    });

    this.newMsg = '';

    setTimeout(() => {
      this.content.scrollToBottom(200);
    })
  }

}
