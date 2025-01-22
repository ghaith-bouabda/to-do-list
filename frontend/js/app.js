
if (!isLoggedIn()) {
    window.location.href = 'login.html';  // Redirect to login page if not logged in
}
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
function logout() {
    fetch('http://localhost:8080/logout', {
        method: 'POST',
        credentials: 'include' // Ensure cookies are included in the request
    })
        .then(response => {
            if (response.ok) {
                console.log('Logout successful');
                localStorage.removeItem('jwtToken');
                localStorage.removeItem('user');
                window.location.href = 'login.html'; // Adjust the redirect URL as needed
            } else {
                console.error('Logout failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
function isLoggedIn() {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
        // Token is not present, redirect to login page
        window.location.href = 'login.html';
        return false;
    }

    const isValid = validateToken(token); // Write your own token validation logic
    if (isValid) {
        return true;
    } else {
        // Invalid token, clear the stored token and redirect
        localStorage.removeItem('jwtToken');
        window.location.href = '/login';
        return false;
    }
}
function validateToken(token) {
    // Decode the token and check its expiration
    // Optionally, you can use a library like jwt-decode to decode the JWT
    const payload = decodeJwt(token);
    if (payload && payload.exp > Date.now() / 1000) {
        return true;  // Token is valid
    }
    return false;  // Token has expired
}

function decodeJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}
