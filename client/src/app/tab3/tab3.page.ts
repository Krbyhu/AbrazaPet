import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

import { AuthService } from '../services/user/auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  data: any = [];

  constructor(private authService: AuthService, private router: Router, public actionSheetController: ActionSheetController, private activedRoute: ActivatedRoute) {}

  params = this.activedRoute.snapshot.params;
  currentImage: any;

  ngOnInit() {
    this.getProfile();
  }

  ionViewWillEnter() {
    console.log('will')
    this.ngOnInit();
  }

  ionViewDidEnter() {
    console.log('did')
    this.ngOnInit();
  }

  ionViewWillLeave() {
    console.log('will leave')
    this.ngOnInit();
  }

  ionViewDidLeave() {
    console.log('did leave')
    this.ngOnInit();
  }

  logOut(){
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'actionSheet',
      mode: "ios",
      buttons: [{
        text: 'Configuración',
        icon: 'cog',
        handler: () => {
          console.log('Configuración');
        }
      }, {
        text: 'Cerrar sesión',
        icon: 'log-out',
        handler: () => {
          this.logOut();
        }
      }]
    });
    await actionSheet.present();
  }

  getProfile() {
    if (this.params.usr_name) {
      this.authService.profile(this.params.usr_name).subscribe(
        res => {
          this.data = res;
          this.currentImage = this.data.profile_image
        },
        err => console.error(err)
      )
    }
  }

  prueba() {
    this.router.navigate(['/test']);
  }
}
