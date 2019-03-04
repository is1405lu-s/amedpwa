import React from 'react'
import {Container, Table, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

import HSAVisitTD from './HSAVisitTD'
import HEVisitTD from './HEVisitTD'
import ScreeningForm from './ScreeningForm'
import { Redirect } from 'react-router-dom'

import AuthService from './AuthService';

class ViewPatient extends React.Component {
    constructor(props) {
        super()
        this.state = {
            patient: {},
            caregivers: null,
            village: {},
            HSA_visits: null,
            HE_visits: null
        }

        this.printOutCaregivers = this.printOutCaregivers.bind(this)
        this.printOutHSAVisits = this.printOutHSAVisits.bind(this)
        this.Auth = new AuthService()

    }

    // TODO: Make sure this method loops properly and prints out also if there is multiple caregivers:
    printOutCaregivers() {
        if(this.state.caregivers != null){
            return this.state.caregivers.map(function(caregiver){
                return (
                    <div key={caregiver.ID}>
                        <p><b>Caregiver name: </b>{caregiver.name}</p>
                        <p><b>Caregiver relation to patient: </b>{caregiver.relationToPatient}</p>
                    </div>
                )
            })
        }
    }

    printOutHSAVisits() {

        // Loop through array, printing out each visit.
        if(this.state.HSA_visits != null) {
            return this.state.HSA_visits.map(function(visit) {
                return(
                    <HSAVisitTD visit={visit} key={visit.patientID + visit.diagnosisID + visit.HSAID + visit.symptomID} />
                )
            })
        }
    }

    printOutHEVisits() {

        // Loop through array, printing out each visit.
        if(this.state.HE_visits != null) {
            return this.state.HE_visits.map(function(visit) {
                return(
                    <HEVisitTD visit={visit} key={visit.patientID + visit.diagnosisID + visit.expertID} />
                )
            })
        }
    }

    componentDidMount(){

        // Fetch patient object.
        this.Auth.fetch(`http://localhost:3000/patient/${this.props.match.params.id}`)
            .then(
                (fetchedPatient) => {
                    console.log(fetchedPatient)
                    this.setState({
                        patient: fetchedPatient
                    });
                },
                (error) => {
                    this.setState({
                        error
                    })
                })

        // Fetch patient caregiver object.
        this.Auth.fetch(`http://localhost:3000/caregiver/${this.props.match.params.id}`)
            .then(
                (fetchedCaregiver) => {
                    this.setState({
                        caregivers: fetchedCaregiver
                    });
                },
                (error) => {
                    this.setState({
                        error
                    })
                })

        // Fetch patient hsa visits array.
        this.Auth.fetch(`http://localhost:3000/hsavisit/${this.props.match.params.id}`)
            .then(
                (fetchedHSAVisits) => {
                    this.setState({
                        HSA_visits: fetchedHSAVisits
                    });
                },
                (error) => {
                    this.setState({
                        error
                    })
                })

        // Fetch patient he visits array.
        this.Auth.fetch(`http://localhost:3000/hevisit/${this.props.match.params.id}`)
            .then(
                (fetchedHEVisits) => {
                    this.setState({
                        HE_visits: fetchedHEVisits
                    });
                },
                (error) => {
                    this.setState({
                        error
                    })
                })

    }

    render() {
        return (
            <Container>
                {
                    this.Auth.loggedIn() ? '' : <Redirect to='/login' />
                }

                <h2>Patient details</h2>
                <p><b>Name: </b>{this.state.patient.name}</p>
                <p><b>Date of birth: </b>{this.state.patient.dateOfBirth}</p>
                <p><b>Mobile No: </b>{this.state.patient.mobileNo}</p>
                <p><b>National ID: </b>{this.state.patient.nationalID}</p>
                <p><b>Sex: </b>{this.state.patient.sex}</p>
                <p><b>Village: </b>{this.state.patient.villageName}</p>

                <div>
                    {
                        // Check if patient has a caregiver, if so, print out caregiver, else don't.
                        this.printOutCaregivers()
                    }
                </div>


                <div class="text-center">
                    <Link to={{ pathname:'/alaf/', state: { patient: this.state.patient } }}><Button variant="primary">Fill out symptoms sheet</Button></Link>
                    <br /><br />
                </div>

                <h2>HSA visits</h2>
                <Table>

                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Diagnosis?</th>
                        <th>Treatment?</th>
                    </tr>
                    </thead>

                    {
                        // Check if patient has HSA visits, if so, print out visits, else don't.
                        this.printOutHSAVisits()
                    }

                </Table>

                <h2>HE visits</h2>
                <Table>

                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Diagnosis?</th>
                        <th>Treatment?</th>
                    </tr>
                    </thead>

                    {
                        // Check if patient has HE visits, if so, print out visits, else don't.
                        this.printOutHEVisits()
                    }

                </Table>

            </Container>
        )
    }
}

export default ViewPatient
