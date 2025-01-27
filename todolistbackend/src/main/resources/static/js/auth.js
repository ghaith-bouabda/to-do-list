

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`http://localhost:8080/api/auth/auth`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password}),
    });

    if (response.ok) {
const  result = await response.json();
localStorage.setItem('token',result.token);
        window.location.href = 'dashboard.html';
        return response.text();
    } else {
        throw new Error('Invalid credentials');
    }

}

async function register() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`http://localhost:8080/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
        alert('Registration successful');
        window.location.href = 'login.html';
    } else {
        alert('Registration failed');
    }
}

