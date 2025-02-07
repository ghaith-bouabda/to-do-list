import { Component } from '@angular/core';
import {TaskControllerService} from "../../../../services/services/task-controller.service";
import {Task} from "../../../../services/models/task";

@Component({
  selector: 'app-today',
  standalone: false,
  
  templateUrl: './today.component.html',
  styleUrl: './today.component.scss'
})
export class TodayComponent {
    tasks: Task[] = [];

    constructor(private taskService: TaskControllerService) {}

    ngOnInit(): void {
        this.loadTodayTasks();
    }

    loadTodayTasks(): void {
        this.taskService.getTodayTasks().subscribe({
            next: async (response) => {
                if (response instanceof Blob) {
                    const jsonString = await response.text();
                    this.tasks = JSON.parse(jsonString);
                } else {
                    this.tasks = response;
                }
            },
            error: (err) => {
                console.error('Error fetching today\'s tasks:', err);
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
