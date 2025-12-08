const { initializeDatabase } = require('../../database/db_setup.js');

exports.createSheetModel = async (user_id, data) => {
    const db = await initializeDatabase();
    const result = await db.run(
        `INSERT INTO UserCharSheet (user_id, data) VALUES (?, ?)`,
        [user_id, data] 
    );
    return result;
};

exports.getSheetsByUserID = async (user_id) => {
    const db = await initializeDatabase();
    const result = await db.all(
        `SELECT * FROM UserCharSheet WHERE user_id = ?`,
        [user_id]
    );
    return result;
};