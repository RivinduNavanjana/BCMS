// src/msalConfig.js
import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: "YOUR_MICROSOFT_CLIENT_ID",
    authority: "https://login.microsoftonline.com/common", // Common authority for multi-tenant apps
    redirectUri: "http://localhost:3000", // Your redirect URI
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);
