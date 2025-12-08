const express = require('express');
const cors = require('cors');
const path = require('path');
const process = require('process');

const fireAdmin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

const { initializeDatabase } = require('./database/db_setup');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

// Firebase Admin configuration
try {
    fireAdmin.initializeApp({
        credential: fireAdmin.credential.cert(serviceAccount),
    });
    console.log('Firebase Admin Initialized...');
} catch (error) {
    console.error('Firebase Admin Initialization Error', error);
}

// Database
try {
    initializeDatabase().then((db) => {
        app.locals.db = db;
        console.log('Database created successfully...');
    });
} catch (error) {  
    console.error('Database Initialization Error', error);
}

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});