document.addEventListener('DOMContentLoaded', () => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        window.location.href = 'login.html';
    }
});
const apiBase = 'http://localhost:8080/api/tasks';

const user= JSON.parse(localStorage.getItem('user'));
document.getElementById('username_placeholder').innerText = user.username;
// Fetch and display tasks

async function fetchTasks() {
    const id= user.id;
    const response = await fetch(`${apiBase}?userId=${id}`);
    const tasks = await response.json();
    console.log(tasks);
    const tasksList = document.getElementById('tasks');
    tasksList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = `${task.title} ${task.completed ? '✔️' : ''}`;

        tasksList.appendChild(li);
    });
}
console.log(user);
async function addTask() {
    const taskInput = document.getElementById('taskInput');
    const newTask = { title: taskInput.value, completed: false ,user:{id: user.id} };
    await fetch(`${apiBase}/createtask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
    });
    taskInput.value = '';
    await fetchTasks();
}
async function logout() {
    localStorage.removeItem('authToken');
}


document.addEventListener('DOMContentLoaded', fetchTasks);
