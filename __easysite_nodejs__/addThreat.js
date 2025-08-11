async function addThreat(threatData) {
    // This function adds a threat detection to the database
    try {
        const result = await window.ezsite.apis.tableCreate(33675, threatData);
        return {
            success: true,
            message: "Threat data added successfully", 
            data: result
        };
    } catch (error) {
        throw new Error(`Failed to add threat data: ${error.message}`);
    }
}