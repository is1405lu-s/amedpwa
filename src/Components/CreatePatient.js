import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import { Route, Switch, Redirect } from 'react-router-dom'

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

class CreatePatient extends React.Component {

    constructor() {
        super()
        this.state = {
            name: '',                   // VARCHAR
            nationalID: '',             // INT
            mobileNo: '',               // INT
            sex: '',                    // VARCHAR
            villageName: '',            // VARCHAR
            dateOfBirth: new Date(),     // DATE

            createdPatient: false
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
            dateOfBirth: date
          })
    }

    resetState() {
        this.setState(
            {
                name: '',           // VARCHAR
                mobileNo: '',       // INT
                sex: '',            // VARCHAR
                villageName: '',    // VARCHAR
                dateOfBirth: '',     // DATE
            }
        )
    }


    handleSubmit(event) {
        event.preventDefault();
        var patient = {
            name: this.state.name,                   // VARCHAR
            nationalID: this.props.nationalID,             // INT
            mobileNo: this.state.mobileNo,               // INT
            sex: this.state.sex,                    // VARCHAR
            villageName: this.state.villageName,            // VARCHAR
            dateOfBirth: this.state.dateOfBirth,
        }
        fetch('http://localhost:3000/patient', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(patient)
        })
        .then(res => res.json(patient))
        .then(
          (result) => {
            console.log(result);
              this.setState({createdPatient: true, createPatient: patient});
          });
    }

    render() {
        return (
        <div style={this.props.createPatient ? {display: ''} : {display: 'none'}}>
            <br />
            <p>Could not find patient with the id {this.props.nationalID}.</p>
            <h3>Create the patient?</h3>

            <Form onSubmit={this.handleSubmit}>

                <Form.Group controlId="formStudyID">
                    <Form.Label>Study ID</Form.Label>
                    <Form.Control 
                        readOnly 
                        name="nationalID" 
                        value={this.props.nationalID}
                        onChange={this.handleChange} 
                        type="text" 
                        placeholder={this.props.nationalID} 
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
                            name="mobileNo"
                            onChange={this.handleChange}
                            value={this.state.mobileNo}
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
                            name="villageName"
                            onChange={this.handleChange}
                            value={this.state.villageName}
                            type="text"
                            placeholder="Patient village name"
                        /> 
                    </Form.Group>

                    

                    <Form.Group controlId="formDateOfBirth">
                        <Form.Label>Enter patient date of birth</Form.Label>
                        <br></br>
                        <DatePicker
                            selected={this.state.dateOfBirth}
                            onChange={this.handleDateChange}
                            name="dateOfBirth"
                            type="date"
                            placeholderText="MM-DD-YYYY"
                        />
                    </Form.Group>

                    <ButtonToolbar>
                    <Button variant="primary" type="submit">
                        Create
                    </Button>
                        
                    </ButtonToolbar>
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