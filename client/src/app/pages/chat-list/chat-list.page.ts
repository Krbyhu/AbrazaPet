import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

import { ChatsService } from '../../services/chat/chats.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.page.html',
  styleUrls: ['./chat-list.page.scss'],
})
export class ChatListPage implements OnInit {

  chats: any = [];

  constructor(private chatService: ChatsService, private router: Router, public actionSheetController: ActionSheetController, private activedRoute: ActivatedRoute) { }

  params = this.activedRoute.snapshot.params;
  usr_name = '';

  ngOnInit() {
    this.getChats();
    this.usr_name = localStorage.getItem('usr_name');
  }

  ionicViewWillEnter() {
    this.ngOnInit();
  }

  ionicViewDidEnter() {
    this.ngOnInit();
  }

  getChats() {
    if (this.params.usr_name) {
      this.chatService.myChats(this.params.usr_name).subscribe(
        res => {
          this.chats = res;
          console.log(this.chats)
        },
        err => console.error(err)
      )
    }
  }

}
