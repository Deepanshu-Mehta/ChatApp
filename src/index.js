import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Toaster } from 'react-hot-toast';
import {Provider} from "react-redux";
import store from './Redux/Store.js';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
let persistor = persistStore(store);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    <Toaster />
    </PersistGate>
    </Provider>
  </React.StrictMode>
);


