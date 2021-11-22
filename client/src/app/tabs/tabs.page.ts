import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{

  selectedPath = '';

  constructor(private router:Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      if(event && event.url){
        this.selectedPath = event.url;
      }
    });
  }

  usr_name: string;
  tabCustom: any;

  ngOnInit() {
    this.usr_name = localStorage.getItem('usr_name');
    this.tabCustom = 'tab3/' + this.usr_name
    console.log(this.selectedPath)
  }

  ionViewWillEnter() {
    this.ngOnInit();
  }

}
