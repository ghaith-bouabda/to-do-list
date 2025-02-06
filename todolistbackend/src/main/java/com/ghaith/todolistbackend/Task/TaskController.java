package com.ghaith.todolistbackend.Task;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://172.18.0.1:8000")
@RequestMapping("/api/tasks")
@RequiredArgsConstructor  // Lombok annotation to generate constructor with required arguments
public class TaskController {

    private final TaskService taskService;

    // Get all tasks by user ID
    @GetMapping
    public List<Task> getAllTasksByUser(@RequestParam Long userId) {
        return taskService.getAllTasksByUserId(userId);
    }

    // Get upcoming tasks
    @GetMapping("/upcoming")
    public List<Task> getUpcomingTasks() {
        return taskService.getUpcomingTasks();
    }

    // Get today's tasks
    @GetMapping(value = "/today" , produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Task> getTodayTasks() {
        return taskService.getTodayTasks();
    }

    // Create new task
    @PostMapping
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
