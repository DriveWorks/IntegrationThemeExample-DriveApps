const SERVER_URL = config.serverUrl;
const GROUP_ALIAS = config.groupAlias;
const CREDENTIALS = config.credentials;
const DRIVE_APP_PING_INTERVAL = config.driveAppPingInterval;

const FORM_OUTPUT = document.getElementById("form-output");

// Get url query
const URL_QUERY = new URLSearchParams(window.location.search);
const APP_ALIAS = URL_QUERY.get("app");

// Create DriveWorks API client
let DW_CLIENT;
async function dwClientLoaded() {
    try {
        DW_CLIENT = new window.DriveWorksLiveClient(SERVER_URL);
    } catch (error) {
        console.log(error);
        FORM_OUTPUT.innerHTML = errorWithBackLink("Client could not be found.");
        return;
    }

    init();
}

async function init() {
    setTabTitle(APP_ALIAS);

    // Check and set stored session id
    const sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
        FORM_OUTPUT.innerHTML = errorWithBackLink("Session Id not found. Return to list to login.");
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
}

// Run a DriveApp
async function runDriveApp(appAlias) {
    try {

        // Run DriveApp
        const driveApp = await DW_CLIENT.runDriveApp(GROUP_ALIAS, appAlias);

        // Clear loading message
        FORM_OUTPUT.innerHTML = "";

        // Render DriveApp Form
        await driveApp.render(FORM_OUTPUT);

        // Prevent DriveApp timeout from inactivity, as long as the page is in view.
        // A DriveApp will timeout after a configured period of inactivity (see DriveWorksConfigUser.xml).
        driveApp.enableAutoPing(DRIVE_APP_PING_INTERVAL);
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
 * Set browser tab title
 *
 * @param {Object} text - The text to display in the title.
 */
 function setTabTitle(text) {
    document.title = `${text} | Run - DriveWorks`;
}
