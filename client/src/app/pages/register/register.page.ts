import { Component, OnInit, ViewChild  } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { IUser } from 'src/app/models/models';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../services/user/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;


  data: any = [];
  user: IUser = {
    rut: '',
    names: '',
    lst_names: '',
    usr_name: '',
    mail: '',
    pass: '',
    idTipoUsuario: 1
  };

  re = /\S+@\S+\.\S+/;


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private loadingController: LoadingController, private alertController: AlertController) { }

  public namesForm = this.fb.group({

    names: ["", Validators.required],
    lst_names: ["", Validators.required]

});

public mailForm = this.fb.group({

  mail: ["", Validators.required],
  rut: ["", Validators.required]

});

public userForm = this.fb.group({

  usr_name: ["", Validators.required],
  pass: ["", Validators.required]

});

  ngOnInit() {
  }


  nextFirst() {
    this.user.names = this.namesForm.controls.names.value;
    this.user.lst_names = this.namesForm.controls.lst_names.value;
    this.slides.slideNext();
  }

  async nextSecond() {
    const loading = await this.loadingController.create({
      duration: 700,
      mode: 'ios',
      spinner: 'bubbles'
    });
    await loading.present();

    // this.user.mail = this.mailForm.controls.mail.value;
    // this.user.rut = this.mailForm.controls.rut.value;

    if ((this.re.test(this.mailForm.controls.mail.value)) == true){
      this.user.mail = this.mailForm.controls.mail.value;
      this.user.rut = this.mailForm.controls.rut.value;
      
      this.authService.signUpFirst(this.user).subscribe(
        async res => {
          await loading.dismiss(); 
          this.data = res;
          this.slides.slideNext();
        },
        async err => {
          await loading.dismiss();
          const alert = await this.alertController.create({
            header: err.error.title,
            message: err.error.msg,
            buttons: ['OK'],
          });
          await alert.present();
        }
      )

    } else {
      const alert = await this.alertController.create({
        header: 'Correo electrónico incorrecto',
        message: 'El correo electrónico que ingresaste es incorrecto. Intenta ingresando uno nuevo.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  async nextFinal() {
    const loading = await this.loadingController.create({
      duration: 700,
      mode: 'ios',
      spinner: 'bubbles'
    });
    await loading.present();

    this.user.usr_name = this.userForm.controls.usr_name.value;
    this.user.pass = this.userForm.controls.pass.value;

    this.authService.signUpSecond(this.user).subscribe(
      async res => {
        await loading.dismiss(); 
        this.data = res;
        this.signUP()
      },
      async err => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: err.error.title,
          message: err.error.msg,
          buttons: ['OK'],
        });
        await alert.present();
      }
    )
  }

  signUP(){
    this.authService.signUp(this.user).subscribe(
      res => {
        this.data = res;
        this.router.navigate(['/login']);
      },
      err => console.log(err)
    )
  }

}
