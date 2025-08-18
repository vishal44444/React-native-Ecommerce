

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import store from './redux/store';  
import { Provider } from 'react-redux';
import React from 'react';

const mainApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => mainApp);