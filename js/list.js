
const SERVER_URL = config.serverUrl;
const GROUP_ALIAS = config.groupAlias;
const CREDENTIALS = config.credentials;

const APP_LIST = document.querySelector("#app-list");

// Create DriveWorks API client
const DW_CLIENT = new window.DriveWorksLiveClient(SERVER_URL);

// Run on load
(async function () {

    try {

        // Login to Group
        const session = await DW_CLIENT.loginGroup(GROUP_ALIAS, CREDENTIALS);
        localStorage.setItem("sessionId", session.sessionId);

        getDriveApps();

    } catch (error) {
        console.log(error);
        APP_LIST.innerHTML = "A login error occurred.";
    }

})();

async function getDriveApps() {

    try {

        const apps = await DW_CLIENT.getDriveApps(GROUP_ALIAS, "$orderby=Alias asc");

        // Clear loading state, show list
        APP_LIST.innerHTML = "";

        // Empty state
        if (!apps || !apps.length) {
            APP_LIST.innerHTML = "No DriveApps available.";
            return;
        }

        // Loop out DriveApps
        for (const app of apps) {

            const spacedName = app.alias.split(/(?=[A-Z])/).join(" ");
            const markup = `
                <div class="app-alias">${spacedName}</div>
                <div class="app-name">${app.name}</div>
            `;

            // Create app list item
            const item = document.createElement("a");
            item.classList.add("app-item");
            item.href = `run.html?app=${app.alias}`;
            item.title = `Start ${app.alias}`;
            item.innerHTML = markup;

            APP_LIST.appendChild(item);
        }

    } catch (error) {
        console.log(error);
        APP_LIST.innerHTML = "Could not list available DriveApps.";
    }

}
