import { saveSheet } from '../services/sheet_service.js';

document.addEventListener('DOMContentLoaded', () => {
    const saveBtn = document.getElementById('saveBtn');

    if (saveBtn) {
        //Adding event listener to the save button for saving sheet data 
        saveBtn.addEventListener('click', async () => {
            
            console.log("Saving sheets in the database...");

            //Uses the global function defined in workshop_controller.js to collect sheet data
            if (typeof window.collectAllSheets !== 'function') {
                console.error("Erro: Function collectAllSheets not found. Verify workshop_controller.js");
                alert("Internal error: Unable to save sheet data.");
                return;
            }

            const allSheetsData = window.collectAllSheets();

            //Visual feedback to the user
            const originalHTML = saveBtn.innerHTML;
            saveBtn.innerText = "Saving...";
            saveBtn.disabled = true;

            //Call the service to save the sheet data
            const success = await saveSheet(allSheetsData);

            //Restore button state
            saveBtn.innerHTML = originalHTML;
            saveBtn.disabled = false;

            if (success) {
                //Optional: Notify user of success
                console.log("Sheets saved successfully.");
            }
        });
    }
});