import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { IUser } from 'src/app/models/models';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../services/user/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  showPassword = false;
  passwordToggleIcon = "eye";

  data: any = []
  userEmail: IUser = {
    mail: '',
    pass: ''
  };
  userUsr_name: IUser = {
    usr_name: '',
    pass: ''
  };
  
  re = /\S+@\S+\.\S+/;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private loadingController: LoadingController, private alertController: AlertController) { }


  public loginForm = this.fb.group({

    loginName: ["", Validators.required],
    loginPass: ["", Validators.required]

});

  async loginUser() {
    const loading = await this.loadingController.create({
      duration: 700,
      mode: 'ios',
      spinner: 'bubbles'
    });
    await loading.present();

    if ((this.re.test(this.loginForm.controls.loginName.value)) == true){
      this.userEmail.mail = this.loginForm.controls.loginName.value;
      this.userEmail.pass = this.loginForm.controls.loginPass.value;
      
      this.authService.logIn(this.userEmail).subscribe(
        async res => {
          await loading.dismiss(); 
          this.data = res;
          localStorage.setItem('usr_name', this.data.usr_name);
          this.router.navigate(['/']);
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
      this.userUsr_name.usr_name = this.loginForm.controls.loginName.value;
      this.userUsr_name.pass = this.loginForm.controls.loginPass.value;
      
      this.authService.logIn(this.userUsr_name).subscribe(
        async res => {
          await loading.dismiss();
          this.data = res;
          localStorage.setItem('usr_name', this.data.usr_name);
          this.router.navigate(['/']);
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
  }

  togglePassword(): void {
    this.showPassword= !this.showPassword;
  }

  ngOnInit() {
    this.loginForm.reset();
  }

}
