import React from "react";
import ReactDOM from "react-dom";
import { BookProvider } from "./BookContext";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
// import reportWebVitals from "./reportWebVitals";

const domain = process.env.REACT_APP_AUTHO_DOMAIN;
console.log("Koca: domain ", domain);
const clientId = process.env.REACT_APP_AUTHO_CLIENT_ID;
console.log("Koca: clientId ", clientId);

ReactDOM.render(
  <Auth0Provider
    domain={"dev-8hmcenchs7ct8p12.us.auth0.com"}
    clientId={"hYol78NEFirBqyPOs2jL89jqyZRikTun"}
    redirectUri={window.location.origin}
  >
    <BookProvider>
      <App />
    </BookProvider>
  </Auth0Provider>,
  document.getElementById("root")
);
