import { initAuth, login } from '../services/auth.service.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('loginButton');
    //const errorMessage = document.getElementById('error-message');

    initAuth((user) => {
        if (user) {
            console.log('User is already logged in:', user);
            window.location.href = '/main.html';
        }
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = emailInput.value;
            const password = passwordInput.value;

            loginButton.disabled = true;
            loginButton.textContent = 'Logging in...';

            try {
                await login(email, password);
                console.log('Login successful');
                window.location.href = '/main.html';
            } catch (error) {
                console.error('Login failed:', error);
                alert('Login failed: ' + error.message);
                loginButton.disabled = false;
                loginButton.textContent = 'Login';
            }
        });
    });
});