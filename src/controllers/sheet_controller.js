const { saveUserSheets, getSheetsByUserID } = require('../models/sheet_model.js');
const { findUserID } = require('../models/user_model.js');

exports.createSheetController = async (req, res) => {
    try {
        if (!req.body.data) {
            return res.status(400).json({ error: 'Data not found.' });
        }

        const firebase_uid = req.user.uid; 
        
        const user = await findUserID(firebase_uid);
        if (!user) {
            return res.status(404).json({ error: 'User not found in database. Please register first.' });
        }
        
        // Transform the data to a JSON string
        const sheet_data = JSON.stringify(req.body.data);

        await saveUserSheets(user.user_id, sheet_data);
        
        return res.status(201).json({ message: 'Sheets saved successfully' });
    } catch (error) {
        console.error('Error saving sheets:', error);
        return res.status(500).json({ error: 'Error saving sheet' });
    };
};

exports.getSheetsController = async (req, res) => {
    try {
        // Get user ID from Firebase UID
        const firebase_uid = req.user.uid;

        // Find user in the database
        const user = await findUserID(firebase_uid);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        // Get sheets by user ID
        const row = await getSheetsByUserID(user.user_id);

        // If no sheets found, return 404
        if (!row) {
            // If no sheets, return empty array
            return res.status(200).json({ sheets: [] });
        }
        
        // Parse the data before sending
        const sheetsData = JSON.parse(row.data);
        res.status(200).json({ sheets: sheetsData });
    } catch (error) {
        console.error('Error retrieving sheets:', error);
        res.status(500).json({ error: 'Error retrieving sheets' });  
    };
};