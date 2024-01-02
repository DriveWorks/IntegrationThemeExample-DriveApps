# DriveWorks Live - Integration Theme Example - DriveApps
### Release: 21.1
#### Minimum DriveWorks Version: 18.1

A distributable template that renders a list of available DriveApps to be run - controlled via a config file.

---

Please note: DriveWorks are not accepting pull requests for this example.  
Join our [online community](https://my.driveworks.co.uk) for discussion, resources and to suggest other examples.

---

### Overview:
- Dynamically injects the DriveWorks Live Client library script using the configured server url (see `config.js`).
    - Provides an example of loading from a static URL, if preferred.
- Connects to the DriveWorks Live Integration Theme API.
- 'List' view.
    - Renders a list of available DriveApps to run.
    - Multiple DriveApps can be launched at once in multiple tabs, using the same session.
- 'Run' view.
    - When selected, the DriveApp is rendered on a separate template (`run.html`).
    - Displays DriveApp alias in tab title.

**Note:** for non-responsive Forms taller than the viewport, remove `.form-output { height: 100vh }` to enable vertical scrolling. This rule ensures Forms fill the viewport by default.

### To use:
1. Clone this repository, or download as a `.zip` file.

2. Enter your Integration Theme details into `config.js`.
    * `serverUrl` - The URL that hosts your Integration Theme, including any ports.
    * `groupAlias` - The public alias created for the Group containing the DriveApps to render - as configured in `DriveWorksConfigUser.xml`.
        * This *must* be specified for each Group you wish to use.
        * This allows you to mask the true Group name publicly, if desired.
        * See [Integration Theme Settings](https://docs.driveworkspro.com/Topic/IntegrationThemeSettings) for additional guidance.
    * `credentials` - [optional] The username and password of the Group user to login.
        * For publicly hosted content, it is advised that default credentials are instead stored within the XML config file (`DriveWorksConfigUser.xml`).
        * See [Integration Theme Connection Settings](https://docs.driveworkspro.com/Topic/IntegrationThemeSettings#Connection-Settings) for additional guidance.
        * Credentials could also be collected via a login form on-demand. See the related [Simple Login Example](https://github.com/DriveWorks/IntegrationThemeExample-SimpleLogin) for additional guidance.
    * `specificationPingInterval` - [optional] The interval at which to 'ping' the server automatically.
        * This ensures a session is kept alive during inactivity, if desired.

3. Ensure that the Integration Theme server is running, using any of the available methods (e.g. Personal Web Edition, DriveWorks Live, IIS).
    * For more information, see [Selecting the Integration Theme](https://docs.driveworkspro.com/Topic/IntegrationThemeSelect).

4. Host the example locally or on a remote server.
    * Ensure `<corsOrigins>` in `DriveWorksConfigUser.xml` permits requests from this location.
    See [Integration Theme Settings](https://docs.driveworkspro.com/Topic/IntegrationThemeSettings) for additional guidance.

### Troubleshooting:

If encountering any issues, please check the browser's console for error messages (F12).  

If you are unable to use the dynamic library loading demonstrated in this example:
1. In all `.html` files, uncomment "Option A" & replace "YOUR-DRIVEWORKS-LIVE-SERVER-URL.COM" with the URL of your own DriveWorks Live server that is serving `DriveWorksLiveIntegrationClient.min.js` - including any ports.
    * This should be the URL that hosts the Integration Theme, and serves it's landing page.
    * To check that this URL is correct, attempt to load `DriveWorksLiveIntegrationClient.min.js` in a browser. It should return a minified code library.
2. Remove the "Option B" `<script>` tag.

### Potential Issues:

* When serving this example for a domain different to your DriveWorks Live server, e.g. api.my-site.com from www.company.com, 'SameSite' cookie warnings may be thrown when the Client SDK attempts to store the current session id in a cookie.
    * This appears as "Error: 401 Unauthorized" in the browser console, even with the correct configuration set.
    * To resolve:
        * Ensure you are running DriveWorks 18.2 or above.
        * Ensure HTTPS is enabled in DriveWorks Live's settings.
        * Ensure a valid SSL certificate has been configured via `DriveWorksConfigUser.xml`.
        * Ensure if using an incognito/private window, third-party cookies are not blocked (see browser settings).
        * See [Integration Theme Settings](https://docs.driveworkspro.com/Topic/IntegrationThemeSettings) for additional guidance.

---

This source code has been made available to demonstrate how you can integrate with DriveWorks using the DriveWorks Live API.
This code is provided under the MIT license. For more details, see the included LICENSE file.

The example requires that you have the latest DriveWorks Live SDK installed, operational and remotely accessible.
