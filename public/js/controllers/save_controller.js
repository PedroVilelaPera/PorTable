import { saveSheet, loadSheets } from '../services/sheet_service.js';
import { initAuth } from '../services/auth.service.js';

document.addEventListener('DOMContentLoaded', () => {
    initAuth(async (user) => {
        if (user) {
            console.log("Usuário detectado. Buscando fichas...");
            const cloudSheets = await loadSheets();

            if (cloudSheets && Array.isArray(cloudSheets) && cloudSheets.length > 0) {
                console.log("Fichas carregadas:", cloudSheets);
                
                // Assuming a global function to load sheet data into the UI
                if (typeof window.loadSheetData === 'function') {
                    window.loadSheetData(cloudSheets);
                } else {
                    console.warn("Função window.loadSheetData não encontrada.");
                }
            }
        }
    });
    
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