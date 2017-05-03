import 'babel-polyfill';
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import { Provider } from 'react-redux';

import store from './store';
import routes from './routes';

// For Material-UI
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


const container = document.getElementById('container');

ReactDOM.render(<Provider store={store}>{routes}</Provider>, container);

// Eliminates the 300ms delay between a physical tap
// and the firing of a click event on mobile browsers
// https://github.com/ftlabs/fastclick
FastClick.attach(document.body);
