import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {authGuard} from "../../services/authguard/authguard.service";
import {CompletedComponent} from "./sidebar/completed/completed.component";
import {MainComponent} from "./main/main.component";
import {TodayComponent} from "./sidebar/today/today.component";
import {UpcomingComponent} from "./sidebar/upcoming/upcoming.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent, // Parent Component (contains sidebar)
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'today', component: TodayComponent },
      { path: 'completed', component: CompletedComponent },
      {path: 'upcoming', component: UpcomingComponent},
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Default child route
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
