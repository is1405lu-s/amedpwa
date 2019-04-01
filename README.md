﻿## A Medic Mobile App

This PWA (Progressive Web App) is written using Microsoft Azure (MySQL) and Node.js as backend with React as frontend. Basic knowledge with these is required.

The project consists of two folders, which are accessible in the following links: 
- API: https://github.com/joelklingberg/amedicapi 
- This folder, PWA: https://github.com/is1405lu-s/amedpwa 

You will need to install the following: 
- Node.js including npm

Create a database in Microsoft Azure according to the UML-model below:
![alt text](https://github.com/is1405lu-s/amedpwa/blob/master/Database%20model.png)

To change the database connection to your database, change the attributes in the *connect.js* file in the API-folder.

### To setup the application:
**OBS!** Some of the commands may be for Windows users only. Do not add the apostrophes to the commands.
- Retrieve the two repositories from Github. For ease, save them in the same folder with the pathway C:\Users\ *user name*. 
- Open a  Command Line Tool window
- Type in the pathway to the API-folder (in Windows OS use the command ‘cd *folder name*’)
- At the root of the project, type in ‘npm install’
- Type in ‘npm start’
- Open another Command Line Tool window
- Type in the pathway to the PWA-folder
- At the root of the project, type in ‘npm install’. Wait for it to finish.
- Type in ‘npm start’
- The window will complain about something running on port 3000 already, type in ‘y’
- The application will open in localhost:3001
- You’ll have to have added a user manually to gain full access to the whole application

It's recommended to run in incognito to avoid possible cache problems. 

### Possible improvements for the next version: 
- Better user response
- Better error handling
- Communication channel between CHW and HE, e.g. possibility to call HE through the application
- Fix with the Background sync in the Service Worker, sync between the MySQL- and NoSQL-databases
- Create and see patient's caregiver in offline mode


--------------------------------------
## The text below was autogenerated: 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
"# amedpwa" 
