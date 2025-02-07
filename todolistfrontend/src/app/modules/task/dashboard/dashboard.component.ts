import { Component } from '@angular/core';
import { TaskControllerService } from "../../../services/services/task-controller.service";
import { Router } from "@angular/router";
import { Task } from "../../../services/models/task";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    standalone: false
})
export class DashboardComponent {
    username: string | null = null;
    User: { id: number; username: string } | null = null;
    tasks: Task[] = [];
     errorMsg: any[] | undefined;
     successMsg: string | undefined;
    constructor(private taskService: TaskControllerService) {
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
    complete(task: Task): void {
        // Mark the task as completed
        const updatedTask: Task = {
            title: task.title,
            completed: true,
            id: task.id,
            dueDate: task.dueDate, // Include dueDate if needed
            user: task.user, // Include user if needed
        };

        // Check if task ID is valid
        if (task.id == null) {
            console.error('Task ID is null or undefined');
            this.errorMsg = ['Task ID is required to mark the task as completed.'];
            return;
        }

        // Call the task service to update the task
        this.taskService.updateTask({ id: task.id, body: updatedTask }).subscribe({
            next: () => {
                console.log('Task marked as completed successfully');

                const index = this.tasks.findIndex(t => t.id === task.id);
                if (index !== -1) {
                    this.tasks[index].completed = true;
                }

                this.successMsg = 'Task marked as completed!';

                setTimeout(() => {
                    this.successMsg = '';
                }, 3000);
            },
            error: (err) => {
                console.error('Error marking task as completed', err);
                this.errorMsg = ['Failed to mark task as completed. Please try again.'];
            }
        });
    }
    // Function to retrieve user data from localStorage
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
        user: this.User ? { id: this.User.id } : undefined,
        dueDate:''

    };


    loadTasks(userId: number): void {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("No token found in localStorage!");
            return;
        }

        this.taskService.getAllTasksByUser({ userId }).subscribe({
            next: (tasks) => {
                this.tasks = tasks;
            },
            error: (err) => {
                console.error('Error fetching tasks:', err);
            }
        });
    }
    addTask() {
        const userId = this.User?.id;

        // Ensure the task title and due date are not empty
        if (!this.task.title || !this.task.dueDate) {
            this.errorMsg = ['Task title and due date are required.'];
            return;
        }

        // Ensure user ID is available
        if (!userId) {
            this.errorMsg = ['User ID is required. Please log in again.'];
            return;
        }

        // Create the new task object
        const newTask: Task = {
            title: this.task.title,
            completed: false,
            user: { id: userId },
            dueDate: this.task.dueDate,
        };

        // Call the task service to create the task
        this.taskService.createTask({ body: newTask }).subscribe({
            next: (res) => {
                console.log('Task created successfully', res);

                // Add the task to the local list (optional, if you want to update the UI immediately)
                this.tasks.push({ title: this.task.title, dueDate: this.task.dueDate });

                // Reset the form
                this.task = { title: '', dueDate: '' };

                // Clear error messages
                this.errorMsg = [];

                // Reload tasks for the user (if needed)
                this.loadTasks(userId);
            },
            error: (err) => {
                console.error('Error creating task', err);
                this.errorMsg = ['Failed to create task. Please try again.'];
            }
        });
    }

}
