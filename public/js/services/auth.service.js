import { firebaseConfig } from '../../config/config.js';

let auth = null;

// Initialize Firebase Authentication and listen for user changes
export function initAuth(onUserChanged) {
    // Check if firebase is already initialized
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    auth = firebase.auth();

    auth.onAuthStateChanged((user) => {
        onUserChanged(user);
    });
}

export function getIdToken() {
    return idToken;
}

export async function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
}

export async function register(email, password, name) {
    const cred = await auth.createUserWithEmailAndPassword(email, password);
    if (name) {
        await cred.user.updateProfile({ displayName: name });
    }
    // Força refresh para garantir que o token venha atualizado se necessário
    await cred.user.getIdToken(true);
    return cred.user;
}

export async function logout() {
    return auth.signOut();
}