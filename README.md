# DriveWorks Live - Integration Theme Example - DriveApps
### Version: 1.0.1
#### Minimum DriveWorks Version: 18.1

A distributable template that renders a list of available DriveApps to be run - controlled via a config file.

### This example:
- Renders a list of available DriveApps
- When selected, the DriveApp is rendered on a separate page/tab (run.html)
- Multiple DriveApps can be launched at once in multiple tabs, using the same session.

**Note:** for non-responsive Forms taller than the viewport, remove `.form-output { height: 100vh }` to enable vertical scrolling. This rule ensures Forms fill the viewport by default.

### To use:
1. Clone this repository, or download as a .zip

2. Enter your Integration Theme details into `config.js`
    * `serverUrl` - The URL that hosts your Integration Theme, including any ports.
    * `groupAlias` - The public alias created for the Group containing the project to render - as configured in DriveWorksConfigUser.xml.
        * This *must* be specified for each Group you wish to use.
        * This allows you to mask the true Group name publicly, if desired.
        * See [Integration Theme Settings](https://docs.driveworkspro.com/Topic/IntegrationThemeSettings) for additional guidance.
    * `credentials` - [optional] The username and password of the Group user to login.
        * For publicly hosted content, it is advised that default credentials are instead stored within the XML config file (DriveWorksConfigUser.xml).
        * See [Integration Theme Connection Settings](https://docs.driveworkspro.com/Topic/IntegrationThemeSettings#Connection-Settings) for additional guidance.
        * Credentials could also be collected via a login form on-demand. See the related [Simple Login Example](https://github.com/DriveWorks/IntegrationThemeExample-SimpleLogin) for additional guidance.
    * `specificationPingInterval` - [optional] The interval at which to 'ping' the server automatically
        * This ensures a session is kept alive during inactivity, if desired.

3. In `index.html`, replace "YOUR-DRIVEWORKS-LIVE-SERVER-URL" with the URL of your own DriveWorks Live server that is serving `DriveWorksLiveIntegrationClient.min.js` - including any ports.
    * This should be the URL that hosts the Integration Theme, and serves it's landing page.
    * To check that this URL is correct, attempt to load DriveWorksLiveIntegrationClient.min.js in a browser. It should return a minified code library.

4. Host the example locally or on a remote server.
    * Ensure `<corsOrigins>` in DriveWorksConfigUser.xml permits request from this location.
    See [Integration Theme Settings](https://docs.driveworkspro.com/Topic/IntegrationThemeSettings) for additional guidance.

5. If encountering any issues, check the browser's console for error messages (F12)

### Potential Issues:
* When serving this example for a domain different to your DriveWorks Live server, e.g. api.my-site.com from company.com, 'SameSite' cookie warnings may be thrown when the Client SDK attempts to store the current session id.
    * This appears as "Error: 401 Unauthorized" in the browser console, even with the correct configuration set. 
    * To resolve:
        * Ensure you are running DriveWorks 18.2 or above, HTTPS is enabled in DriveWorks Live's settings and a valid SSL certificate has been configured via DriveWorksConfigUser.xml.
        * See [Integration Theme Settings](https://docs.driveworkspro.com/Topic/IntegrationThemeSettings) for additional guidance.

---

This source code has been made available to demonstrate how you can integrate with DriveWorks using the DriveWorks Live API.
This code is provided under the MIT license, for more details see LICENSE.md.

The example requires that you have the latest DriveWorks Live SDK installed, operational and remotely accessible.
