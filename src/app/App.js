import React from "react";
import logo from "../styles/logo.svg";
import "../styles/App.css";
import { AmplifySignOut } from "@aws-amplify/ui-react";

import { Auth } from "./auth";

function App() {
  return (
    <Auth>
      <div className="App">
        <header>
          <img src={logo} className="App-logo" alt="logo" />
          <h1>We now have Auth!</h1>
        </header>
        <AmplifySignOut />
      </div>
    </Auth>
  );
}

export default App;
