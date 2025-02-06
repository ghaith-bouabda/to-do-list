import { Component } from '@angular/core';
import { TaskControllerService } from "../../../services/services/task-controller.service";
import { Router } from "@angular/router";
import { Task } from "../../../services/models/task";
import {GetAllTasksbyuser$Params} from "../../../services/fn/task-controller/get-all-tasksbyuser";
import {HttpHeaders} from "@angular/common/http";

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
    complete(task :Task): void {
        task={title: task.title,completed:true,id:task.id};
        if(task.id != null) {
            this.taskService.updateTask({id:task.id, body:task}).subscribe({
                next: () => {

                }
            })
        }
        else
            console.error('Task ID is not available!');
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
        user: this.User ? { id: this.User.id } : undefined
    };


    loadTasks(userId: number): void {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("No token found in localStorage!");
            return;
        }

        this.taskService.getAllTasksbyuser({ userId }).subscribe({
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
        if (userId) {
            const newTask: Task = {
                title: this.task.title,
                completed: false,
                user: { id: userId }
            };
            this.taskService.createTask({ body: newTask }).subscribe({
                next: (res) => {
                    console.log('Task created successfully', res);
                    this.loadTasks(userId);
                },
                error: (err) => {
                    console.error('Error creating task', err);
                }
            });
        } else {
            console.error('User ID is null or undefined');
        }
    }

}
