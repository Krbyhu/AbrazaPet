import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, NavController  } from '@ionic/angular';
import { IUser, IUserProfile } from 'src/app/models/models';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { AuthService } from '../../services/user/auth.service';
import { Filesystem } from '@capacitor/filesystem';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.page.html',
  styleUrls: ['./profile-update.page.scss'],
})
export class ProfileUpdatePage implements OnInit {

  data: any = [];
  currentImage: any = '../../../assets/img/avatar.svg';

  user: IUser = {
    names: '',
    lst_names: '',
    usr_name: '',
    mail: '',
}

  userProfile: IUserProfile = {
    addrss: '',
    contact_number: 0,
    profile_image: '',
}

  constructor(private authService: AuthService, private router: Router, public actionSheetController: ActionSheetController, private activedRoute: ActivatedRoute, private camera: Camera, public navCtrl: NavController) { }

  params = this.activedRoute.snapshot.params;


  ngOnInit() {
    if (this.params.usr_name) {
      this.authService.profile(this.params.usr_name).subscribe(
        res => {
          this.data = res;
          this.user.names = this.data.names;
          this.user.lst_names = this.data.lst_names;
          this.user.usr_name = this.data.usr_name;
          this.user.mail = this.data.mail;

          this.userProfile.addrss = this.data.addrss;
          this.userProfile.contact_number = this.data.contact_number;
          
          if (this.data.profile_image == null) {
            this.userProfile.profile_image = '../../../assets/img/avatar.svg'
          } else if (this.data.profile_image == '') {
            this.userProfile.profile_image = '../../../assets/img/avatar.svg'
          } else {
            this.userProfile.profile_image = this.data.profile_image;
          }
        },
        err => console.error(err)
      )
    }
  }

  ionViewWillEnter() {
    this.ngOnInit();
  }

  ionViewDidLeave() {
    this.ngOnInit();
  }

  ionViewWillLeave() {
    this.ngOnInit();
  }


  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'actionSheet',
      mode: "ios",
      buttons: [{
        text: 'Tomar foto',
        icon: 'camera',
        handler: () => {
          this.takePhoto();
        }
      }, {
        text: 'Elegir foto de galería',
        icon: 'image',
        handler: () => {
          this.getPhoto(0);
        }
      }]
    });
    await actionSheet.present();
  }
  
  async takePhoto() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: true,
    }

    this.camera.getPicture(options).then((imageData) => {
      this.userProfile.profile_image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err)
    });
  }

  async getPhoto(sourceType:number) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
    }

    this.camera.getPicture(options).then((imageData) => {
      this.userProfile.profile_image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err)
    });
  }

  updateProfile() {
    this.authService.updateProfile(this.data.usr_name, this.user, this.userProfile).subscribe(
      res => {
        this.redirectTo('tabs/tab3/' + this.data.usr_name);
      },  
      err => console.log(err)
    )
  }

  onCancelFunc() {
    this.navCtrl.navigateRoot(['tabs/tab3', this.data.usr_name]);
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('tabs/tab4', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }
}
