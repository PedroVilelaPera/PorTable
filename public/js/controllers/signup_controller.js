import { register, getIdToken } from '../services/auth.service.js';

const API_URL = 'http://localhost:5000';

document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const btn = document.querySelector('button');

    try {
        btn.textContent = "Signing-up...";
        btn.disabled = true;

        // Create the user in Firebase
        await register(email, password, username);
        
        // Gets the token to authenticate with backend
        const token = await getIdToken();

        // Create user in the backend database
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ email: email, name: username })
        });

        if (response.ok) {
            alert("Account created!");
            window.location.href = "/index.html";
        } else {
            throw new Error("Error registering user in backend.");
        }

    } catch (error) {
        console.error(error);
        alert("Error in register: " + error.message);
        btn.textContent = "Sign-up";
        btn.disabled = false;
    }
});