import { initAuth, login, logout } from '../services/auth.service.js';

document.addEventListener('DOMContentLoaded', () => {
    // login form elements
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('loginBtn');

    // logout button
    const logoutButton = document.getElementById('logoutBtn');

    initAuth((user) => {

        const currentPath = window.location.pathname;

        if (user) {
            console.log('User is logged in:', user);
            // Verify current path
            if (!currentPath.includes('workshop.html')) {
                window.location.href = '/workshop.html';
            }
        } else {
            // Not logged in
            if (currentPath.includes('workshop.html')) {
                window.location.href = '/index.html';
            }
        }
        if (loginForm) {
            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = emailInput.value;
                const password = passwordInput.value;

                loginButton.disabled = true;
                loginButton.textContent = 'Logging in...';

                try {
                    await login(email, password);
                    console.log('Login successful');
                } catch (error) {
                    console.error('Login failed:', error);
                    alert('Login failed: ' + error.message);
                    loginButton.disabled = false;
                    loginButton.textContent = 'Login';
                }
            });
        }

        // logout
        if (logoutButton) {
            logoutButton.addEventListener('click', async () => {
                try {
                    await logout();
                    console.log('Logout successful');
                    window.location.href = '/index.html';
                } catch (error) {
                    console.error('Logout failed:', error);
                    alert('Logout failed: ' + error.message);
                }
            });
        }
    });
});