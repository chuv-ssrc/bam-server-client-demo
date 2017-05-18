import React from 'react';
import store from '../src/store';
import * as actions from '../actions/actionCreators';
import Auth0Lock from 'auth0-lock';
import { isTokenExpired, getUserInfo } from './jwtHelper';


class AuthService {

  constructor(clientId, domain) {
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: 'http://localhost:3000/',
        responseType: 'token',
        params: {
          scope: "openid name email nickname user_id"
        },
        allowSignUp: false,
        allowForgotPassword: false,
      }
    });
    this.lock.on('authenticated', this._doAuthentication.bind(this));
    this.showLogin = this.showLogin.bind(this);
  }

  _doAuthentication(authResult) {
    this.setToken(authResult.idToken);
    store.dispatch(actions.login(authResult.idToken));
  }

  tryLogin() {
    let token = this.getToken();
    if (token && !isTokenExpired(token)) {
      store.dispatch(actions.login(token));
    }
  }

  showLogin() {
    this.lock.show();
  }

  loggedIn() {
    return !!this.getToken();
  }

  setToken(idToken) {
    localStorage.setItem('id_token', idToken);
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  logout() {
    localStorage.removeItem('id_token');
    store.dispatch(actions.logout());
  }

}


export default new AuthService(window.CONFIG.clientId, window.CONFIG.domain);

