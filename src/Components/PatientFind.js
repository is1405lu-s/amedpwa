import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import CreatePatient from './CreatePatient'
import ScreeningForm from './ScreeningForm'
import { Route, Switch, Redirect } from 'react-router-dom'
import {openDb} from 'idb';
import AuthService from './AuthService';

class PatientFind extends React.Component {

  constructor(props) {
    super()
    this.state = {
      national_id: '',
      createPatient: false,
      foundPatient: null, 
      isLoading: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleStudyIDChange = this.handleStudyIDChange.bind(this)
    
      this.Auth = new AuthService();
  }

  handleSubmit(event) {

        const controller = new AbortController();
        const signal = controller.signal;

        setTimeout(() => controller.abort(), 5000); //5 sek

        this.setState({
          isLoading: true
        });

        console.log(this.state.national_id);

        this.Auth.fetch(`http://localhost:3000/patient/${this.state.national_id}`, { signal })
        .then(
          (result) => {
            console.log(result)
            this.setState({
              foundPatient: result, 
              isLoading: false
            });
          },
          (error) => {
            console.log('error, trying local DB');
            var key = parseInt(this.state.national_id);
            const openRequest = openDb('amedic', 1);
            openRequest.then(db => {
              const tx = db.transaction('patient', 'readonly');
              const store = tx.objectStore('patient');
              return store.get(key);
            }).then(obj => {
              if (typeof obj === 'undefined') {
                console.log('not found');
                this.setState({
                  createPatient: true, 
                  isLoading: false, 
                  error
                })
              } else {
                  console.log(obj) //undefined if obj doesnt exist
                  this.setState({
                    foundPatient: obj, 
                    isLoading: false
                  });
                }
              })
          }
          )
      }

      handleChange(event) {
       const target = event.target;
       const value = target.type === 'checkbox' ? target.checked : target.value;
       const name = target.name;

       this.setState({
        [name]: value
      })  
     }

     handleStudyIDChange(event) {
       this.handleChange(event)
       this.setState({createPatient: false})
     }

     render() {

      const {isLoading} = this.state; 

      if (isLoading) {
        return <p id="loading"> Searching... </p>;
      }
      
      return (
      <div class="container">
        { 
        this.Auth.loggedIn() ? '' : <Redirect to='/login' />
     }
      <h1>Patient search</h1>

      <Form>
      <Form.Group controlId="formNationalID">
      <Form.Label>Find patient via National ID</Form.Label>
      <Form.Control 
      name="national_id"
      value={this.state.national_id}
      onChange={this.handleStudyIDChange} 
      type="number"
      placeholder="Enter national ID"
      />
      </Form.Group>

      <Button variant="primary" type="button" onClick={this.handleSubmit}>Search</Button>
      </Form>

      {
       this.state.foundPatient === null ? '' : <Redirect to={{
        pathname: '/alaf/',
        patient: this.state.foundPatient
      }}
      />
    }

    <CreatePatient 
    createPatient={this.state.createPatient}
    national_id={this.state.national_id}
    />

    </div>
    )
  }
}

export default PatientFind
