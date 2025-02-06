import { Component } from '@angular/core';
import {TaskControllerService} from "../../../../services/services/task-controller.service";
import { Task} from "../../../../services/models/task";

@Component({
  selector: 'app-upcoming',
  standalone: false,

  templateUrl: './upcoming.component.html',
  styleUrl: './upcoming.component.scss'
})
export class UpcomingComponent {
  tasks: Task[] = [];

  constructor(private taskService: TaskControllerService) {}

  ngOnInit(): void {
    this.loadUpcomingTasks();
  }

  loadUpcomingTasks(): void {
    this.taskService.getUpcomingTasks().subscribe({
      next: (tasks) => {
        console.log(tasks)
        this.tasks = tasks;
      },
      error: (err) => {
        console.error('Error fetching upcoming tasks:', err);
      }
    });
  }

}
