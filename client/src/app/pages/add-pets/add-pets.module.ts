import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPetsPageRoutingModule } from './add-pets-routing.module';

import { AddPetsPage } from './add-pets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPetsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddPetsPage]
})
export class AddPetsPageModule {}
