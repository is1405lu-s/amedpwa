import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import CreatePatient from './CreatePatient'
import ScreeningForm from './ScreeningForm'
import { Route, Switch, Redirect } from 'react-router-dom'
import {openDb} from "../idb";

class PatientFind extends React.Component {

    constructor(props) {
        super()
        this.state = {
            nationalID: '',
            createPatient: false,
            foundPatient: null
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleStudyIDChange = this.handleStudyIDChange.bind(this)
    }

    handleSubmit(event) {

        // Emulate that no patient was found and you want to show create patient form. 
        //this.setState({createPatient: true})

        fetch(`http://localhost:3000/patient/${this.state.nationalID}`).then(res => res.json())
        .then(
          (result) => {
              console.log(result)
              this.setState({
              //isLoaded: true,
              foundPatient: result
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
            (error) => {
                var key = parseInt(this.state.nationalID);
                const openRequest = openDb("amedic", 1);
                openRequest.then(db => {
                    return db.transaction("patient")
                        .objectStore("patient").get(key);
                }).then(obj => this.setState({
                    foundPatient: obj

                }));
            })

        /*
        if(this.foundPatient) {
            // Found patient, continue to look and assessment form.
        } else {
            // Did not find patient, do you want to create patient?
            this.setState(
                {foundPatient: false}
            )
        }
        */
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
        return (
            <div class="container">
                <h1>Patient search</h1>

                <Form>
                    <Form.Group controlId="formNationalID">
                        <Form.Label>Find patient via National ID</Form.Label>
                        <Form.Control 
                            name="nationalID" 
                            value={this.state.nationalID} 
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
                    nationalID={this.state.nationalID}
                />

                
            </div>
        )
    }
}

export default PatientFind