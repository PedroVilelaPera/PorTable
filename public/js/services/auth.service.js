import { firebaseConfig } from '../../config/config.js';

let auth = null;

// Auxiliary function to ensure Firebase Auth is initialized
function ensureAuth() {
    if (!auth) {
        // If Firebase SDK is not already loaded, load it
        if (typeof firebase !== 'undefined' && !firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        if (typeof firebase !== 'undefined') {
            auth = firebase.auth();
        } else {
            console.error("Firebase SDK não carregado no HTML.");
        }
    }
    return auth;
}

// Auth service functions
export function initAuth(onUserChanged) {
    const authInstance = ensureAuth();
    if (authInstance) {
        authInstance.onAuthStateChanged(async (user) => {
            if (user) {
                onUserChanged(user);
            } else {
                onUserChanged(null);
            }
        });
    }
}

// Get the current user's ID token
export async function getIdToken() {
    const authInstance = ensureAuth();
    if (authInstance && authInstance.currentUser) {
        return await authInstance.currentUser.getIdToken();
    }
    return null;
}

// Login, Register, and Logout functions
export async function login(email, password) {
    const authInstance = ensureAuth();
    return authInstance.signInWithEmailAndPassword(email, password);
}

export async function register(email, password, name) {
    const authInstance = ensureAuth();
    const cred = await authInstance.createUserWithEmailAndPassword(email, password);
    if (name) {
        await cred.user.updateProfile({ displayName: name });
    }
    return cred.user;
}

export async function logout() {
    const authInstance = ensureAuth();
    return authInstance.signOut();
}