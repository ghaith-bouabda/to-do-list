const apiBase = 'http://localhost:8080/users';

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`${apiBase}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        const userResponse = await fetch(`http://localhost:8080/users/getuser?username=${username}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
       const userResponse2 = await userResponse.json();
        localStorage.setItem('user', JSON.stringify(userResponse2));
        localStorage.setItem('authToken', 'your-jwt-token'); // Example: Store JWT

        window.location.href = 'dashboard.html';
        }
    else {
            alert('Invalid credentials');
        }

}

async function register() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`${apiBase}/createuser`, {
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
