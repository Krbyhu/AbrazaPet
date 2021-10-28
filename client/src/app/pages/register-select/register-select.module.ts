import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterSelectPageRoutingModule } from './register-select-routing.module';

import { RegisterSelectPage } from './register-select.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterSelectPageRoutingModule
  ],
  declarations: [RegisterSelectPage]
})
export class RegisterSelectPageModule {}
