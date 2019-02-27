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
/*
function createIndexedDB() {
	openDb('amedic', 1, function(upgradeDB) {
		var store = upgradeDB.createObjectStore('patient', {
			keyPath: 'nationalID'
		});

		//store.put({nationalID: 123, name: 'coke', price: 10.99, quantity: 200});
		store.put({nationalID: 3, name: 'coke', price: 10.99, quantity: 200});

		fetch('http://localhost:3000/patient').then(res => res.json())
		.then(
			(result) => {
				console.log(result[1].nationalID + " " + result[1].mobileNo);
    		//for(var i = 0; i < result.length; i++) {
    			store.put({nationalID: 13, name: 'coke', price: 10.99, quantity: 200});
    			//store.put({nationalID: result[i].nationalID, name: result[i].name, mobileNo: result[i].mobileNo, sex: result[i].sex, village: result[i].village, dateOfBirth: result[i].dateOfBirth});
    		//}
    	})

    //store.put({id: 123, name: 'coke', price: 10.99, quantity: 200});
    //store.put({id: 321, name: 'pepsi', price: 8.99, quantity: 100});
    //store.put({id: 222, name: 'water', price: 11.99, quantity: 300});
});
}
*/

/* 
//All patients, prints name of second row
              fetch('http://localhost:3000/patient').then(res => res.json())
              .then(
                (result) => {
                  console.log(result[1].name);
                });
                */
