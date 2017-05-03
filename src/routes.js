"use strict";
import React from 'react';
import { Route } from 'react-router';
import { HashRouter } from 'react-router-dom';
import HomePage from '../src/home/index.js';


const routes = (
  <HashRouter>
    <Route path="/" component={HomePage} />
  </HashRouter>
);

export default routes;
