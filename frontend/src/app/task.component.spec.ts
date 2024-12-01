import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskComponent } from './task/task.component';
import { TaskService } from './task/task.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Task } from './task/task.model';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let mockTaskService: jasmine.SpyObj<TaskService>;

  const mockTasks: Task[] = [
    { id: 1, title: 'Task 1', completed: false },
    { id: 2, title: 'Task 2', completed: true },
  ];

  beforeEach(async () => {
    mockTaskService = jasmine.createSpyObj('TaskService', [
      'getTasks',
      'createTask',
      'updateTask',
      'deleteTask',
    ]);

    await TestBed.configureTestingModule({
      declarations: [TaskComponent],
      imports: [HttpClientTestingModule, FormsModule], // Include modules used in the component
      providers: [{ provide: TaskService, useValue: mockTaskService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;

    // Mock service responses
    mockTaskService.getTasks.and.returnValue(of(mockTasks));
    mockTaskService.createTask.and.returnValue(of(mockTasks[0]));
    mockTaskService.updateTask.and.returnValue(of(mockTasks[0]));
    mockTaskService.deleteTask.and.returnValue(of());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on initialization', () => {
    component.ngOnInit();
    expect(mockTaskService.getTasks).toHaveBeenCalled();
    expect(component.tasks.length).toBe(2);
    expect(component.tasks).toEqual(mockTasks);
  });

  it('should add a new task', () => {
    const newTask: Task = { title: 'New Task', completed: false };
    component.addTask(newTask.title);
    expect(mockTaskService.createTask).toHaveBeenCalledWith(newTask);
    expect(mockTaskService.getTasks).toHaveBeenCalledTimes(2); // Once in ngOnInit, once after adding
  });

  it('should toggle task completion', () => {
    const taskToUpdate = { ...mockTasks[0] }; // Clone to avoid direct mutation
    taskToUpdate.completed = true;

    component.toggleCompletion(mockTasks[0]);
    expect(mockTaskService.updateTask).toHaveBeenCalledWith(mockTasks[0].id, taskToUpdate);
  });

  it('should delete a task', () => {
    component.deleteTask(mockTasks[0]);
    expect(mockTaskService.deleteTask).toHaveBeenCalledWith(mockTasks[0].id);
    expect(mockTaskService.getTasks).toHaveBeenCalledTimes(2); // Reload after deletion
  });
});
