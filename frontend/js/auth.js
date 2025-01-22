const apiBase = 'http://localhost:8080/users';


function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    fetch('http://localhost:8080/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    })
        .then(response => {
            if (response.ok) {

                return response.text();
            } else {
                throw new Error('Invalid credentials');
            }
        })
        .then(token => {
           adduser().then(r => console.log(r));
            localStorage.setItem('jwtToken', token);
            window.location.href = 'dashboard.html';  // Redirect to protected page
        })
        .catch(error => {
            alert(error.message);
        });
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

async function fetchUserDetails(username, token) {
    try {
        const response = await fetch(`http://localhost:8080/users/getuser?username=${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Send the JWT token in the header
            },
        });

        if (response.ok) {
            const userJson = await response.json();
            localStorage.setItem('user', JSON.stringify(userJson));  // Store user details in localStorage
        } else {
            throw new Error('Failed to fetch user details');
        }
    } catch (error) {
        console.error('Error fetching user details:', error.message);
    }
}
