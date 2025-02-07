import { Component } from '@angular/core';
import {Task} from "../../../../services/models/task";
import {TaskControllerService} from "../../../../services/services/task-controller.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-completed',
  standalone: false,
  
  templateUrl: './completed.component.html',
  styleUrl: './completed.component.scss'
})
export class CompletedComponent {
  username: string | null = null;
  User: { id: number; username: string } | null = null;
  tasks: Task[] = [];
  constructor(private taskService: TaskControllerService, private router: Router) {
    this.User = this.getUserFromLocalStorage();
    if (this.User) {
      this.username = this.User.username;
    }
  }

  ngOnInit(): void {
    if (this.User && this.User.id !== undefined) {
      this.loadTasks(this.User.id);
    } else {
      console.error('User ID is not available!');
    }
  }
  getUserFromLocalStorage(): { id: number; username: string } | null {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      return { id: parsedUser.id, username: parsedUser.username };
    } else {
      return null;
    }
  }


  task: Task = {
    title: '',
    completed: false,
    user: this.User ? { id: this.User.id } : undefined
  };


  loadTasks(userId: number): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token found in localStorage!");
      return;
    }

    this.taskService.getAllTasksByUser({ userId }).subscribe({
      next: (tasks) => {
        this.tasks = tasks.filter(task => task.completed === true);      },
      error: (err) => {
        console.error('Error fetching tasks:', err);
      }
    });
  }




}
