const SERVER_URL = config.serverUrl;
const GROUP_ALIAS = config.groupAlias;
const CREDENTIALS = config.credentials;

const FORM_OUTPUT = document.querySelector("#form-output");

// Get url query
const URL_QUERY = new URLSearchParams(window.location.search);
const APP_ALIAS = URL_QUERY.get("app");

// Create DriveWorks API client
const DW_CLIENT = new window.DriveWorksLiveClient(SERVER_URL, {downloadStyle: "header"});

// Run on load
(async function () {

    // Check and set stored session id
    const sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
        FORM_OUTPUT.innerHTML = errorWithBackLink("Session Id not found. Please login.");
        return;
    }
    DW_CLIENT._sessionId = sessionId;

    // Check DriveApp Alias from URL
    if (APP_ALIAS) {
        runDriveApp(APP_ALIAS);
        document.title = `${APP_ALIAS} | DriveApps`;
        return;
    }

    FORM_OUTPUT.innerHTML = errorWithBackLink("Please provide the name of a DriveApp.");

})();

// Run a DriveApp
async function runDriveApp(appAlias) {

    try {

        // Run DriveApp
        const driveApp = await DW_CLIENT.runDriveApp(GROUP_ALIAS, appAlias);

        // Clear loading message
        FORM_OUTPUT.innerHTML = "";

        // Render DriveApp Form
        await driveApp.render(FORM_OUTPUT);
        pingDriveApp(driveApp);

    } catch (error) {
        console.log(error);
        FORM_OUTPUT.innerHTML = errorWithBackLink(error);
    }

}

// Generate error with "Back" link
function errorWithBackLink(message) {
    return `
        <p>${message}</p>
        <p><a href="index.html">Go back</a></p>
    `;
}

/**
 * Ping the running DriveApp
 *
 * A DriveApp will timeout after a configured period of inactivity (see DriveWorksConfigUser.xml).
 * This function prevents a DriveApp timing out as long as the page is in view.
 *
 * @param driveApp The DriveApp object.
 */
function pingDriveApp(driveApp) {

    // Disable ping if interval is 0
    if (config.driveAppPingInterval === 0) {
        return;
    }

    // Ping DriveApp to reset timeout
    driveApp.ping();

    // Schedule next ping
    setTimeout(pingDriveApp, config.driveAppPingInterval * 1000, driveApp);

}
