const { initializeDatabase } = require('../../database/db_setup.js');

export async function createSheetModel(user_id, data) {
    const db = await initializeDatabase();
    const result = await db.run(
        `INSERT INTO UserCharSheet (user_id, data) VALUES (?, ?)`,
        [user_id, data] 
    );
    return result;
};

export async function getSheetsByUserID(user_id) {
    const db = await initializeDatabase();
    const result = await db.all(
        `SELECT * FROM UserCharSheet WHERE user_id = ?`,
        [user_id]
    );
    return result;
};