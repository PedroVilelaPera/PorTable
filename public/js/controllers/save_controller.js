import { saveSheet } from '../services/sheet.service.js';

document.addEventListener('DOMContentLoaded', () => {
    const saveBtn = document.getElementById('saveBtn');

    if (saveBtn) {
        //Adding event listener to the save button for saving sheet data 
        saveBtn.addEventListener('click', async () => {
            
            console.log("Saving sheets in the database...");

            //Uses the global function defined in workshop_controller.js to collect sheet data
            if (typeof window.collectSheetData !== 'function') {
                console.error("Erro: Function collectSheetData not found. Verify workshop_controller.js");
                alert("Internal error: Unable to save sheet data.");
                return;
            }

            const sheetData = window.collectSheetData();

            //Visual feedback to the user
            const originalText = saveBtn.innerText;
            saveBtn.innerText = "Salvando...";
            saveBtn.disabled = true;

            //Call the service to save the sheet data
            const success = await saveSheet(sheetData);

            //Restore button state
            saveBtn.innerText = originalText;
            saveBtn.disabled = false;

            if (success) {
                //Optional: Notify user of success
                console.log("Sheets saved successfully.");
            }
        });
    }
});