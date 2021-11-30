import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { IPets } from 'src/app/models/models';
import { FormBuilder, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController, NavController  } from '@ionic/angular';

import { PetsService } from '../../services/pets/pets.service';

@Component({
  selector: 'app-add-pets',
  templateUrl: './add-pets.page.html',
  styleUrls: ['./add-pets.page.scss'],
})
export class AddPetsPage implements OnInit {

  data: any = [];
  pet: IPets = {
    usr_name: localStorage.getItem('usr_name'),
    idPetGender: 0,
    idTipoMascota: 0,
    pet_name: '',
    descripcion: '',
    pet_image: '../../../assets/img/avatarpet.svg',
    chip: '',
  }

  constructor(private petsService: PetsService, private router: Router, private loadingController: LoadingController, private alertController: AlertController, public actionSheetController: ActionSheetController, private camera: Camera, public navCtrl: NavController, private fb: FormBuilder) { }

  public petForm = this.fb.group({

    idPetGender: [0, Validators.required],
    idTipoMascota: [0, Validators.required],
    pet_name: ["", Validators.required],
    descripcion: ["", Validators.required],
    chip: ["", Validators.required],

});

  ngOnInit() {
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
      this.pet.pet_image = 'data:image/jpeg;base64,' + imageData;
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
      this.pet.pet_image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err)
    });
  }


  onChangePet(selectedValue){
    this.pet.idTipoMascota = selectedValue;
  }

  onChangeGender(selectedValue){
    this.pet.idPetGender = selectedValue;
  }

  onChangeChip(selectedValue){
    this.pet.chip = selectedValue;
  }

  addPet() {
    this.pet.pet_name = this.petForm.controls.pet_name.value;
    this.pet.descripcion = this.petForm.controls.descripcion.value;
    console.log(this.pet)

    this.petsService.AddPet(this.pet).subscribe(
      res => {
        this.data = res;
        this.redirectTo('/mypets/' + this.pet.usr_name);
      },
      err => console.log(err)
    )
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('tabs/tab4', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }

}
