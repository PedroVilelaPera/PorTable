const { createSheetModel } = require('../models/sheet_model.js');''
const { findUserID } = require('../models/user_model.js');

exports.createSheetController = async (req, res) => {
    try {
        const user = await findUserID(req.body.firebase_uid);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Create sheet logic
        const sheet_data = JSON.stringify(req.body.data);
        // Alert: user.user_id may cause issues if the DB schema changes
        await createSheetModel(user.user_id, sheet_data);
        return res.status(201).json({ message: 'Sheet created successfully' });
    } catch (error) {
        console.error('Error creating sheet:', error);
        return res.status(500).json({ error: 'Error creating sheet' });
    };
};

exports.getSheetsController = async (req, res) => {
    try {
        const user = await findUserID(req.body.firebase_uid);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const sheets = await getSheetsByUserID(user.user_id);
        const data = sheets.map(sheet => ({
            sheet_id: sheet.sheet_id,
            data: JSON.parse(sheet.data)
        }));
        res.status(200).json({ sheets: data });
    } catch (error) {
        console.error('Error retrieving sheets:', error);
        res.status(500).json({ error: 'Error retrieving sheets' });  
    };
};