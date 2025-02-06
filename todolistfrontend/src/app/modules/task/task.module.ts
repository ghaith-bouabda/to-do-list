import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {FormsModule} from "@angular/forms";
import { SidebarComponent } from './sidebar/sidebar.component';
import { TodayComponent } from './sidebar/today/today.component';
import { UpcomingComponent } from './sidebar/upcoming/upcoming.component';
import { CompletedComponent } from './sidebar/completed/completed.component';
import {CdkDrag} from "@angular/cdk/drag-drop";
import { MainComponent } from './main/main.component';


@NgModule({
    declarations: [
        DashboardComponent,
        SidebarComponent,
        TodayComponent,
        UpcomingComponent,
        CompletedComponent,
        MainComponent
    ],
    exports: [
        SidebarComponent
    ],
    imports: [
        CommonModule,
        TaskRoutingModule,
        FormsModule,
        CdkDrag
    ]
})
export class TaskModule { }
