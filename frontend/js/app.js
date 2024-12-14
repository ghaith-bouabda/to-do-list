const apiBase = 'http://localhost:8080/api/tasks';

// Fetch and display tasks
async function fetchTasks() {
    const response = await fetch(apiBase);
    const tasks = await response.json();
    const tasksList = document.getElementById('tasks');
    tasksList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = `${task.title} ${task.completed ? '✔️' : ''}`;
        tasksList.appendChild(li);
    });
}

// Add a task
async function addTask() {
    const taskInput = document.getElementById('taskInput');
    const newTask = { title: taskInput.value, completed: false };
    await fetch(apiBase, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
    });
    taskInput.value = '';
    fetchTasks();
}

// Load tasks on page load
document.addEventListener('DOMContentLoaded', fetchTasks);
