const { initializeDatabase } = require('../../database/db_setup.js');

exports.createUserModel = async (firebase_uid, user_id, data) => {
    const db = await initializeDatabase();
    const result = await db.run(
        `INSERT INTO User (firebase_uid, user_id, email, name) VALUES (?, ?, ?, ?)`,
        [firebase_uid, user_id, data.email, data.name] 
    );
    return result;
};

exports.findUserID = async (firebase_uid) => {
    const db = await initializeDatabase();
    const result = await db.get(
        `SELECT * FROM User WHERE firebase_uid = ?`,
        [firebase_uid]
    );
    return result;
};