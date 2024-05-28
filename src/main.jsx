import React from 'react';
import App from './App.jsx';
import MobileDetector from './components/MobileDetector.jsx';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/reducers.jsx';
import { createRoot } from 'react-dom/client';

const store = createStore(rootReducer);

const root = document.getElementById('root');

const rootElement = createRoot(root);
rootElement.render(
  <Provider store={store}>
    <MobileDetector />
    <App />
  </Provider>
);
