import React, { Component } from 'react';
//import './App.css';
import ScreeningForm from './Components/ScreeningForm'
import Header from './Components/Header'

import AuthService from './Components/AuthService'
import withAuth from './Components/withAuth';
const Auth = new AuthService();

class App extends Component {
  render() {
    return (
        <div className="App">

          <Header />

          <link
              rel="stylesheet"
              href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
              integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
              crossorigin="anonymous"
          />

          <ScreeningForm />
        </div>
    );
  }

  handleLogout(){
    Auth.logout()
    this.props.history.replace('/login');
  }
}

export default withAuth(App);
