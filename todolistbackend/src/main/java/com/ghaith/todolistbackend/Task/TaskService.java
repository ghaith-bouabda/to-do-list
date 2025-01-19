package com.ghaith.todolistbackend.Task;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor  // Lombok annotation to generate a constructor with required arguments
public class TaskService {

    private final TaskRepository taskRepository;


    public List<Task> getAllTasksbyUserId(Long userId) {
        return  taskRepository.findByUser_Id(userId);
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id).orElse(null);
    }


    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public Task updateTask(Long id, Task taskDetails) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            task.setTitle(taskDetails.getTitle());
            task.setCompleted(taskDetails.isCompleted());
            return taskRepository.save(task);
        }
        return null;
    }


    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}
