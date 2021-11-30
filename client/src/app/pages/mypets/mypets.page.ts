import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

import { PetsService } from '../../services/pets/pets.service';

@Component({
  selector: 'app-mypets',
  templateUrl: './mypets.page.html',
  styleUrls: ['./mypets.page.scss'],
})
export class MypetsPage implements OnInit {


  constructor(private petsService: PetsService, private router: Router, public actionSheetController: ActionSheetController, private activedRoute: ActivatedRoute) { }

  params = this.activedRoute.snapshot.params;
  usr_name = '';
  data: any = [];

  ngOnInit() {
    this.getMyPets();
    this.usr_name = localStorage.getItem('usr_name');
  }

  ionicViewWillEnter() {
    this.ngOnInit();
  }

  ionicViewDidEnter() {
    this.ngOnInit();
  }

  getMyPets() {
    this.petsService.myPets(this.params.usr_name).subscribe(
      res => {
        this.data = res;
        console.log(this.data)
      },
      err => console.error(err)
    )
  }

}
