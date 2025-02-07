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
        this.tasks = tasks;
      },
      error: (err) => {
        console.error('Error fetching upcoming tasks:', err);
      }
    });
  }
  complete(task :Task): void {
    task={title: task.title,completed:true,id:task.id};
    if(task.id != null) {
      this.taskService.updateTask({id:task.id, body:task}).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(t => t.id !== task.id);
        }
      })
    }
    else
      console.error('Task ID is not available!');
  }

}
