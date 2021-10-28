import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterSelectPage } from './register-select.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterSelectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterSelectPageRoutingModule {}
