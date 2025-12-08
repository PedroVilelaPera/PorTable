const express = require('express');
const cors = require('cors');
const path = require('path');
const process = require('process');

const fireAdmin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

const { initializeDatabase } = require('./database/db_setup');


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req, res) => {
    res.send('Server is running and ready.');
});

async function initializeApp() {
    // Firebase Admin configuration
    try {
        fireAdmin.initializeApp({ credential: fireAdmin.credential.cert(serviceAccount) });
        console.log('Firebase Admin Initialized...');
    } catch (error) {
        console.error('Firebase Admin Initialization Error', error);
    }

    // Database
    try {
        const db = await initializeDatabase(); 
        app.locals.db = db;
        console.log('Database created successfully...');
    } catch (error) {  
        console.error('Database Initialization Error', error);
        process.exit(1);
    }
    
    // Routes
    // const fichaRoutes = require('./routes/ficha_routes');
    // app.use('/', fichaRoutes); 
    
    // Initialize server
    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
}

initializeApp();