import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import * as guards from './_helpers/guards';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [guards.AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [guards.LoginGuard]
  },
  {
    path: 'register-select',
    loadChildren: () => import('./pages/register-select/register-select.module').then( m => m.RegisterSelectPageModule), canActivate: [guards.LoginGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule),
    canActivate: [guards.LoginGuard]
  },
  {
    path: 'profile-update/:usr_name',
    loadChildren: () => import('./pages/profile-update/profile-update.module').then( m => m.ProfileUpdatePageModule), canActivate: [guards.AuthGuard]
  },
  {
    path: 'test',
    loadChildren: () => import('./pages/test/test.module').then( m => m.TestPageModule), canActivate: [guards.AuthGuard]
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule), canActivate: [guards.AuthGuard]
  },
  {
    path: 'mypets/:usr_name',
    loadChildren: () => import('./pages/mypets/mypets.module').then( m => m.MypetsPageModule), canActivate: [guards.AuthGuard]
  },
  {
    path: 'add-pets',
    loadChildren: () => import('./pages/add-pets/add-pets.module').then( m => m.AddPetsPageModule), canActivate: [guards.AuthGuard]
  },
  {
    path: 'complete-profile',
    loadChildren: () => import('./pages/complete-profile/complete-profile.module').then( m => m.CompleteProfilePageModule), canActivate: [guards.AuthGuard]
  },
  {
    path: 'chat-list/:usr_name',
    loadChildren: () => import('./pages/chat-list/chat-list.module').then( m => m.ChatListPageModule)
  },
  {
    path: 'chat-room/:idConversacion',
    loadChildren: () => import('./pages/chat-room/chat-room.module').then( m => m.ChatRoomPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
