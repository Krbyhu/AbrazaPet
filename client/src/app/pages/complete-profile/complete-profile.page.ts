import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, NavController  } from '@ionic/angular';
import { IUser, IUserProfile } from 'src/app/models/models';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../services/user/auth.service';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.page.html',
  styleUrls: ['./complete-profile.page.scss'],
})
export class CompleteProfilePage implements OnInit {

  data: any = [];

  userProfile: IUserProfile = {
    usr_name: '',
    addrss: '',
    contact_number: 0,
    profile_image: '../../../assets/img/avatar.svg',
}

  constructor(private authService: AuthService, private router: Router, public actionSheetController: ActionSheetController, private activedRoute: ActivatedRoute, private camera: Camera, public navCtrl: NavController, private fb: FormBuilder) { }

  public profileForm = this.fb.group({

    addrss: ["", Validators.required],
    contact_number: ["", Validators.required],
  });

  ngOnInit() {
    this.userProfile.usr_name = localStorage.getItem('usr_name')
  }

  IonViewWillEnter() {
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

  completeProfile() {
    this.userProfile.addrss = this.profileForm.controls.addrss.value;
    this.userProfile.contact_number = this.profileForm.controls.contact_number.value;
    
    this.authService.completeProfile(this.userProfile).subscribe(
      res => {
        this.data = res;
        this.router.navigate(['/tabs/tab1']);
      },
      err => console.log(err)
    )
  }

}
