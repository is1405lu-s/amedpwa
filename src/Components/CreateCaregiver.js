import React from 'react'
import {Form, Button, Alert} from 'react-bootstrap'
import AuthService from './AuthService';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { Route, Switch, Redirect } from 'react-router-dom'

class CreateCaregiver extends React.Component {

    constructor() {
        super()
        this.state = {
            name: '',
            national_id: '',
            relation_to_patient: '',
            date_of_birth: new Date(),
            mobile_no: '',
            caregiver_id: '',
            patient_id: '', 

            created: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        this.Auth = new AuthService();
    }

    handleDateChange(date) {
        this.setState({
            date_of_birth: date
        })
    }

    handleChange(event) {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name

        this.setState({
            [name]: value
        })
    }

    componentDidMount() {
        console.log(this.props.location.patient)
        console.log(this.props.location.national_id)
    }

    handleSubmit(event) {
        event.preventDefault()

        var caregiver_nID = parseInt(this.state.national_id);
        var caregiver_mNo = parseInt(this.state.mobile_no)

        let caregiver = {
            name: this.state.name,
            national_id: caregiver_nID,
            relation_to_patient: this.state.relation_to_patient,
            date_of_birth: this.state.date_of_birth,
            mobile_no: caregiver_mNo
        }

        // Create caregiver
        this.Auth.fetch('http://localhost:3000/caregiver/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(caregiver)
        }).then(response => {
            console.log('tried to create caregiver')
            this.setState({caregiver_id: response.ID})
        })

        var nID = parseInt(this.props.location.national_id)
        var mNo = parseInt(this.props.location.patient.mobile_no)

        let patient = {
            name:this.props.location.patient.name,
            national_id:nID,
            mobile_no:mNo,
            sex:this.props.location.patient.sex,
            village_name:this.props.location.patient.village_name,
            date_of_birth:this.props.location.patient.date_of_birth
        }

        // Create patient
        this.Auth.fetch('http://localhost:3000/patient/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(patient)
        }).then(response => {
            console.log('tried to create patient')
            console.log(response);
            this.setState({
                national_id: this.props.location.national_id,
                patient_id: response.ID, 
                createdPatient: patient
            })
            console.log(this.state.national_id)
            console.log(this.state.patient_id)
            
            if(this.state.patient_id != '' && this.state.caregiver_id != '') {
                console.log('här')
                let caregiverpatient = {
                    patient_id: this.state.patient_id,
                    caregiver_id: this.state.caregiver_id
                }

                this.Auth.fetch('http://localhost:3000/caregiverpatient/', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(caregiverpatient)
                }).then(response => {
                    console.log('tried to create caregiverpatient');
                    this.setState({
                        created: true
                    })
                })
            }

            //this.props.history.push(`/patient/${this.props.location.patient.national_id}`);
        })


    }

    render() {

        return (
            <div className="container">
            <h3>Enter patient caregiver</h3>
            <Form onSubmit={this.handleSubmit}>

            <Form.Group controlId="formCaregiverName">
            <Form.Label>Enter caregiver's name</Form.Label>
            <Form.Control
            required
            name="name"
            onChange={this.handleChange}
            value={this.state.name}
            type="text"
            placeholder="Caregiver name"
            />
            </Form.Group>

            <Form.Group controlId="formCaregiverNationalId">
            <Form.Label>Enter caregiver national id</Form.Label>
            <Form.Control
            required
            name="national_id"
            onChange={this.handleChange}
            value={this.state.national_id}
            type="text"
            placeholder="Caregiver national id"
            />
            </Form.Group>

            <Form.Group controlId="formCaregiver">
            <Form.Label>Enter caregiver's relation to patient</Form.Label>
            <Form.Control
            required
            name="relation_to_patient"
            onChange={this.handleChange}
            value={this.state.relation_to_patient}
            type="text"
            placeholder="Relation to patient"
            />
            </Form.Group>

            <Form.Group controlId="formMobileNo">
            <Form.Label>Enter caregiver's Mobile No</Form.Label>
            <Form.Control
            required
            name="mobile_no"
            onChange={this.handleChange}
            value={this.state.mobile_no}
            type="text"
            placeholder="Caregiver mobile no"
            />
            </Form.Group>

            <Form.Group controlId="formCaregiverDateOfBirth">
            <Form.Label>Enter caregiver's date of birth</Form.Label>
            <br></br>
            <DatePicker
            selected={this.state.date_of_birth}
            onChange={this.handleDateChange}
            name="caregiverDateOfBirth"
            type="date"
            placeholderText="MM-DD-YYYY"
            />
            </Form.Group>

            <Button variant="primary" type="submit">Create</Button>

            </Form>
            {
             this.state.created === false ? '' : <Redirect to={{
                pathname: `/patient/${this.state.national_id}`,
                patient: this.state.createdPatient, 
                caregiver: this.state.caregiver
            }}
            />
        }
        </div>
        )
    }

}

export default CreateCaregiver