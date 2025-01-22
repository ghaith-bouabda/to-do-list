package com.ghaith.todolistbackend.Task;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://172.18.0.1:8000")

@RequestMapping("/api/tasks")
@RequiredArgsConstructor  // Lombok annotation to generate constructor with required arguments
public class TaskController {

    private final TaskService taskService;

    // Get all tasks
    @GetMapping
    public List<Task> getAllTasksbyuser(@RequestParam Long userId) {
        return taskService.getAllTasksbyUserId(userId);
    }



    // Create new task
    @PostMapping("/createtask")
    public Task createTask(@RequestBody Task task) {
        return taskService.createTask(task);
    }

    // Update existing task
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        return taskService.updateTask(id, taskDetails);
    }

    // Delete task
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }
}