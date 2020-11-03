import React, { useState, useEffect } from "react";
import {
  AmplifyAuthenticator,
  AmplifySignIn,
  AmplifySignOut,
} from "@aws-amplify/ui-react";
import { API, Auth } from "aws-amplify";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import logo from "../../styles/logo.svg";
import "../../styles/App.css";

import { I18n } from "@aws-amplify/core";
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

async function addToGroup() {
  let apiName = "AdminQueries";
  let path = "/addUserToGroup";
  let myInit = {
    body: {
      username: "cvenegas",
      groupname: "doctors",
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `${(await Auth.currentSession())
        .getAccessToken()
        .getJwtToken()}`,
    },
  };
  return await API.post(apiName, path, myInit);
}

let nextToken;

async function listEditors(limit) {
  let apiName = "AdminQueries";
  let path = "/listUsersInGroup";
  let myInit = {
    queryStringParameters: {
      groupname: "doctors",
      limit: limit,
      token: nextToken,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `${(await Auth.currentSession())
        .getAccessToken()
        .getJwtToken()}`,
    },
  };
  const { NextToken, ...rest } = await API.get(apiName, path, myInit);
  nextToken = NextToken;
  return rest;
}

function AuthStateApp() {
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
      <button onClick={addToGroup}>Add to Group</button>
      <button onClick={() => listEditors(10)}>List Editors</button>
      <AmplifySignOut />
    </div>
  ) : (
    <AmplifyAuthenticator>
      <AmplifySignIn slot="sign-in" />
    </AmplifyAuthenticator>
  );
}

export default AuthStateApp;
