import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from './routes/Routes';
//import fetchSync from 'fetch-sync';


// ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(<Router><Routes /></Router>, document.getElementById('root'));

//registering serviceWorker
serviceWorker();
//fetchSync.init();
