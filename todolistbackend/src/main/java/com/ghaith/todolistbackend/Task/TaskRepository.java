package com.ghaith.todolistbackend.Task;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUser_Id(Long userId);
    @Query("SELECT t FROM Task t WHERE t.dueDate = CURRENT_DATE AND t.completed = false")
    List<Task> findTodayTasks();
    @Query("SELECT t FROM Task t WHERE t.dueDate > CURRENT_DATE AND t.completed = false")
    List<Task> findUpcomingTasks();

}
