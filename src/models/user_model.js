const { initializeDatabase } = require('../../database/db_setup.js');

exports.createUserModel = async (firebase_uid,user_id, data) => {
    const db = await initializeDatabase();
    const result = await db.run(
        `INSERT INTO Users (firebase_uid, user_id, data) VALUES (?, ?, ?)`,
        [firebase_uid, user_id, data] 
    );
    return result;
};

exports.findUserID = async (firebase_uid) => {
    const db = await initializeDatabase();
    const result = await db.get(
        `SELECT * FROM Users WHERE firebase_uid = ?`,
        [firebase_uid]
    );
    return result;
};