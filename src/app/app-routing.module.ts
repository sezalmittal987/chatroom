import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { RoomsComponent } from './rooms/rooms.component';
import { ChatComponent } from './chat/chat.component';

import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {path: 'home' ,component: HomeComponent},
  {path: 'register' ,component: RegisterComponent},
  {path: 'rooms' ,component: RoomsComponent ,canActivate : [AuthGuardService]},//
  {path: 'chats' ,component: ChatComponent ,canActivate : [AuthGuardService]},//
  {path: '', redirectTo : '/rooms', pathMatch : 'full'},
];

@NgModule({
  imports: [
    CommonModule,  
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 