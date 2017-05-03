"use strict";
import React from 'react';
import { Route, Redirect } from 'react-router';
import { HashRouter } from 'react-router-dom';
import AuthService from '../utils/AuthService';

import HomePage from '../src/home/index.js';


// Validate authentication for private routes
const requireAuth = (nextRouterState, replace) => {
  if (!AuthService.loggedIn) {
    replace({ pathname: '/login' });
  }
};


const routes = (
  <HashRouter>
    <Route path="/" component={HomePage} />
  </HashRouter>
);

export default routes;
