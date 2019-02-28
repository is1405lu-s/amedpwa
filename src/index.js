import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom'
import { Routes } from './routes/Routes'
//import { openDb, deleteDb } from 'idb';

//const dbPromise = createIndexedDB();

//import { Routes } from './routes' // Where we are going to specify our routes.

// ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(<Router><Routes /></Router>, document.getElementById('root'));

	// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

//registering serviceWorker
serviceWorker();
