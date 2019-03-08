import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import { Route, Switch, Redirect } from 'react-router-dom'

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import {openDb} from 'idb';
import fetch from '../fetchWithTimeout';
//import fetchSync from 'fetch-sync'


class CreatePatient extends React.Component {

    constructor() {
        super()
        this.state = {
            name: '',                   // VARCHAR
            national_id: '',             // INT
            mobile_no: '',               // INT
            sex: '',                    // VARCHAR
            village: '',            // VARCHAR
            date_of_birth: new Date(),     // DATE

            createdPatient: false, 
            isLoading: false,
        }

        this.handleChange = this.handleChange.bind(this)
        this.resetState = this.resetState.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })  
    }

    handleDateChange(date) {
        this.setState({
            date_of_birth: date
        })
    }

    resetState() {
        this.setState(
        {
                name: '',           // VARCHAR
                mobile_no: '',       // INT
                sex: '',            // VARCHAR
                village: '',    // VARCHAR
                date_of_birth: '',     // DATE
            }
            )
    }

    handleSubmit(event) {
        event.preventDefault();

        var nID = parseInt(this.props.national_id);
        var mNo = parseInt(this.state.mobile_no)
        var patient = {
            name: this.state.name,                   // VARCHAR
            national_id: nID,             // INT
            mobile_no: mNo,               // INT
            sex: this.state.sex,                    // VARCHAR
            village: this.state.village,            // VARCHAR
            date_of_birth: this.state.date_of_birth,
        }

        this.setState({
          isLoading: true
      });

        fetch('http://localhost:3000/patient', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(patient)
        }, 5000)
        .then(
          (result) => {
            console.log(result);
            this.setState({
                createdPatient: true,
                createPatient: patient, 
                isLoading: false});
        },
        (error) => {
            /*
            const post = fetchSync('http://localhost:3000/patient', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(patient)
            }); */
            console.log('error, creating in local DB');
            const openRequest = openDb("amedic", 1);
            openRequest.then(db => {
                db.transaction("patient", "readwrite").objectStore("patient").put({
                    national_id: patient.national_id,
                    name: patient.name, 
                    mobile_no: patient.mobile_no,
                    sex: patient.sex, 
                    village: patient.village, 
                    date_of_birth: patient.date_of_birth
                });
            })
            this.setState({
                createdPatient: true,
                createPatient: patient, 
                isLoading: false});
        })
    }

    render() {

        const {isLoading} = this.state; 

        if (isLoading) {
            return <p id="loading"> Creating... </p>;
        }

        return (
        <div style={this.props.createPatient ? {display: ''} : {display: 'none'}}>
        <br />
        <p>Could not find patient with the id {this.props.national_id}.</p>
        <h3>Create the patient?</h3>

        <Form onSubmit={this.handleSubmit}>

        <Form.Group controlId="formStudyID">
        <Form.Label>Study ID</Form.Label>
        <Form.Control 
        readOnly 
        name="national_id"
        value={this.props.national_id}
        onChange={this.handleChange} 
        type="text" 
        placeholder={this.props.national_id}
        />
        </Form.Group>

        <Button variant="outline-primary" onClick={this.resetState}>Clear form values</Button>

        <br />

        <Form.Group controlId="formName">
        <Form.Label>Enter patient name</Form.Label>
        <Form.Control
        required
        name="name"
        onChange={this.handleChange}
        value={this.state.name}
        type="description"
        placeholder="Patient name"
        /> 
        </Form.Group>

        <Form.Group controlId="formName">
        <Form.Label>Enter patient mobile number</Form.Label>
        <Form.Control
        required
        name="mobile_no"
        onChange={this.handleChange}
        value={this.state.mobile_no}
        type="number"
        placeholder="Patient mobile number"
        /> 
        </Form.Group>

        <fieldset>
        <Form.Group>
        <Form.Label>
        Enter patient sex
        </Form.Label>
        <Form.Check
        required
        type="radio"
        label="Male"
        name="sex"
        id="formSexMale"
        value="male"
        checked={this.state.sex === "male"}
        onChange={this.handleChange}
        />
        <Form.Check
        type="radio"
        label="Female"
        name="sex"
        id="formSexFemale"
        value="female"
        checked={this.state.sex === "female"}
        onChange={this.handleChange}
        />
        </Form.Group>
        </fieldset>

        <Form.Group controlId="formName">
        <Form.Label>Enter patient village name</Form.Label>
        <Form.Control
        required
        name="village"
        onChange={this.handleChange}
        value={this.state.village}
        type="text"
        placeholder="Patient village name"
        /> 
        </Form.Group>



        <Form.Group controlId="formDateOfBirth">
        <Form.Label>Enter patient date of birth</Form.Label>
        <br></br>
        <DatePicker
        selected={this.state.date_of_birth}
        onChange={this.handleDateChange}
        name="date_of_birth"
        type="date"
        placeholderText="MM-DD-YYYY"
        />
        </Form.Group>

        <ButtonToolbar>
        <Button variant="primary" type="submit">
        Create
        </Button>

        </ButtonToolbar>
        <br></br>
        </Form>

        {
            this.state.createdPatient === false ? '' : <Redirect to={{
                pathname: '/alaf/',
                patient: this.state.createPatient
            }}
            />
        }

        </div>
        )
    }

}

export default CreatePatient