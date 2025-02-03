import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {authGuard} from "./services/authguard/authguard.service";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login' ,
    component: LoginComponent
  },
  {
    path: 'register' ,
    component: RegistrationComponent
  }
  ,
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/task/task.module').then(m => m.TaskModule),
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
