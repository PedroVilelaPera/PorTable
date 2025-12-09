const { createUserModel } = require('../models/user_model.js');

exports.registerUserController = async (req, res) => {
    try {
        const { email, name } = req.body;
        const firebase_uid = req.user.uid;

        await createUserModel(firebase_uid, null, { email, name });
        
        res.status(201).json({ message: "Register Successful!" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Intern error in register." });
    }
};