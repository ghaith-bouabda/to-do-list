import { Component } from '@angular/core';
import {TaskControllerService} from "../../../services/services/task-controller.service";
import {Router, RouterModule} from "@angular/router";
import {Task} from "../../../services/models/task";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    standalone: false
})
export class DashboardComponent {
  constructor(private taskService:TaskControllerService , private router:Router) { }
  task: Task = {title:'',completed:false}
  addTask() {
    this.taskService.createTask(
        {
          body: this.task
        })
  }
}
