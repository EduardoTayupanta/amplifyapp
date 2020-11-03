import React, { useState, useEffect } from "react";
import {
  AmplifyAuthenticator,
  AmplifySignIn,
  AmplifySignOut,
} from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import logo from "../../styles/logo.svg";
import "../../styles/App.css";

import { I18n } from "@aws-amplify/core";
// import { strings } from './strings';
// I18n.putVocabularies(strings);
// I18n.setLanguage('es');
import { Translations } from "@aws-amplify/ui-components";
I18n.putVocabulariesForLanguage("en-US", {
  [Translations.SIGN_IN_HEADER_TEXT]: "Iniciar sesión en su cuenta",
  [Translations.USERNAME_LABEL]: "Nombre de usuario *",
  [Translations.USERNAME_PLACEHOLDER]: "Ingrese su nombre de usuario",
  [Translations.EMPTY_USERNAME]: "El nombre de usuario no puede estar vacío",
  [Translations.PASSWORD_LABEL]: "Contraseña *",
  [Translations.PASSWORD_PLACEHOLDER]: "Ingresa tu contraseña",
  [Translations.SIGN_IN_ACTION]: "Iniciar sesión",
});

function Auth() {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <div className="App">
      <header>
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Hello, {user.username}</h1>
      </header>
      <AmplifySignOut />
    </div>
  ) : (
    <AmplifyAuthenticator>
      <AmplifySignIn
        // headerText={I18n.get("Sign in to your account")}
        slot="sign-in"
        // formFields={[
        //   {
        //     type: "username",
        //     label: "Nombre de usuario",
        //     placeholder: "Ingrese su nombre de usuario",
        //     required: true,
        //   },
        //   {
        //     type: "password",
        //     label: "Contraseña",
        //     placeholder: "Ingrese su contraseña",
        //     required: true,
        //   },
        // ]}
      />
    </AmplifyAuthenticator>
  );
}

export default Auth;
