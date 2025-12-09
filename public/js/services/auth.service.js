import { firebaseConfig } from '../../config/config.js';

let auth = null;

// Initialize Firebase Authentication and listen for user changes
export function initAuth(onUserChanged) {
    // Check if firebase is already initialized
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    auth = firebase.auth();

    // Listener for auth state changes (login/logout)
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            // User is signed in
            onUserChanged(user);
        } else {
            // User is signed out
            onUserChanged(null);
        }
    });
}

// Get the current valid token (refreshes automatically if expired)
export async function getIdToken() {
    if (auth && auth.currentUser) {
        // Returns the current token or fetches a new one if expired
        return await auth.currentUser.getIdToken();
    }
    return null;
}

// Login with email and password
export async function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
}

// Register a new user
export async function register(email, password, name) {
    const cred = await auth.createUserWithEmailAndPassword(email, password);
    if (name) {
        // Update the user profile with the provided name
        await cred.user.updateProfile({ displayName: name });
    }
    return cred.user;
}

// Logout the current user
export async function logout() {
    return auth.signOut();
}