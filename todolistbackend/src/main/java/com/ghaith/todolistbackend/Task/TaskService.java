package com.ghaith.todolistbackend.Task;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor  // Lombok annotation to generate a constructor with required arguments
public class TaskService {

    private final TaskRepository taskRepository;

    public List<Task> getAllTasksByUserId(Long userId) {
        return taskRepository.findByUser_Id(userId);
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id).orElse(null);
    }

    public List<Task> getUpcomingTasks() {
        return taskRepository.findUpcomingTasks();
    }

    public List<Task> getTodayTasks() {
        return taskRepository.findTodayTasks();
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public Task updateTask(Long id, Task taskDetails) {
        return taskRepository.findById(id).map(task -> {
            task.setTitle(taskDetails.getTitle());
            task.setCompleted(taskDetails.isCompleted());
            task.setDueDate(taskDetails.getDueDate()); // Ensure dueDate can be updated
            return taskRepository.save(task);
        }).orElse(null);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}
