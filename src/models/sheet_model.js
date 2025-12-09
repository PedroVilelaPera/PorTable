const { initializeDatabase } = require('../../database/db_setup.js');

// Post a new sheet model or update existing one
exports.saveUserSheets = async (user_id, data) => {
    const db = await initializeDatabase();
    
    // Verify if a sheet already exists for the user
    const existing = await db.get(`SELECT sheet_id FROM UserCharSheet WHERE user_id = ?`, [user_id]);
    
    if (existing) {
        //If it exists, UPDATE
        return await db.run(
            `UPDATE UserCharSheet SET data = ? WHERE user_id = ?`,
            [data, user_id]
        );
    } else {
        //If it doesn't exist, CREATE
        return await db.run(
            `INSERT INTO UserCharSheet (user_id, data) VALUES (?, ?)`,
            [user_id, data]
        );
    }
};

// Get sheet model by user ID
exports.getSheetsByUserID = async (user_id) => {
    const db = await initializeDatabase();
    const result = await db.get(
        `SELECT * FROM UserCharSheet WHERE user_id = ?`,
        [user_id]
    );
    return result;
};