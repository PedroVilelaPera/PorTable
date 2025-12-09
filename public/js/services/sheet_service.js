import { getIdToken } from './auth.service.js';

const API_URL = 'http://localhost:5000';

//Function to save the character sheet to the server
export async function saveSheet(sheetData) {
    try {
        //Get the current user's token
        const token = await getIdToken();

        if (!token) {
            alert('You need to be logged to save.');
            return false;
        }

        //Send data to the backend
        const response = await fetch(`${API_URL}/sheets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` //Sends the safe token
            },
            body: JSON.stringify({
                data: sheetData //Wraps the data
            })
        });

        //Check everything went fine
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Unknown error');
        }

        const result = await response.json();
        console.log('Server response:', result);
        return true;

    } catch (error) {
        console.error('Save error:', error);
        alert('Error while saving: ' + error.message);
        return false;
    }
}