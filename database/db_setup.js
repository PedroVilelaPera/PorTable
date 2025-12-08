const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const DB_NAME = 'database.db';

async function initializeDatabase() {
    const db = await sqlite.open({
        filename: DB_NAME,
        driver: sqlite3.Database
    });
    
    await db.exec(`
        CREATE TABLE IF NOT EXISTS User (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            firebase_uid TEXT UNIQUE NOT NULL,
            email TEXT NOT NULL,
            name TEXT
        );
        CREATE TABLE IF NOT EXISTS UserCharSheet (
            sheet_id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            data TEXT NOT NULL, 

            CONSTRAINT fk_user_id
                FOREIGN KEY (user_id)
                REFERENCES User(user_id)
                ON DELETE CASCADE
        );
    `);
    ''
    return db;
}

module.exports = { initializeDatabase };