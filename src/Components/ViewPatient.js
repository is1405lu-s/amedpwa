import React from 'react'
import {Container, Table, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

import VisitTD from './VisitTD'
import ScreeningForm from './ScreeningForm'
import { Redirect } from 'react-router-dom'
import {openDb} from 'idb';

import AuthService from './AuthService';

class ViewPatient extends React.Component {
    constructor(props) {
        super()
        this.state = {
            patient: {},
            caregivers: null,
            caregiverPatient: {
                patient_id: '',
                id: ''
            },
            village: {},
            visits: null, 
            diagnosis_id: 2
        }

        this.printOutCaregivers = this.printOutCaregivers.bind(this)
        this.printOutVisits = this.printOutVisits.bind(this)
        this.Auth = new AuthService()

    }

    // TODO: Make sure this method loops properly and prints out also if there is multiple caregivers:
    printOutCaregivers() {
        if(this.state.caregivers != null){
            return this.state.caregivers.map(function(caregiver){
                return (
                    <div key={caregiver.ID}>
                    <hr />
                    <p><b>Caregiver name: </b>{caregiver.name}</p>
                    <p><b>Caregiver relation to patient: </b>{caregiver.relation_to_patient}</p>
                    <p><b>Caregiver date of birth: </b>{caregiver.date_of_birth}</p>
                    <p><b>Caregiver mobile no: </b>{caregiver.mobile_no}</p>
                    </div>
                    )
                })
            }
        }

        printOutVisits() {

            // Loop through array, printing out each visit.
            /* TODO: Fix HSA_visits to use the new visit model. */
            if(this.state.visits != null) {
                let visitsArray = this.state.visits
                visitsArray.sort(function(a,b){
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.timestamp) - new Date(a.timestamp);
            });
                return this.state.visits.map(function(visit) {
                    return(
                        <VisitTD visit={visit} key={visit.patient_id + visit.user_id + visit.symptoms_sheet_id}/>
                        )
                })
            }

        }

        printOutHEVisits() {

        // Loop through array, printing out each visit.
        /* TODO: Fix HE_visits to just use the new visit model.
        if(this.state.HE_visits != null) {
            return this.state.HE_visits.map(function(visit) {
                return(
                    <HEVisitTD visit={visit} key={visit.patientID + visit.diagnosisID + visit.expertID} />
                )
            })
        }
        */
    }

    componentDidMount(){


      if (this.props.location.patient.ID != undefined) {
        console.log(this.props.location.patient);
        console.log(this.props.match.params.id);
        // Fetch patient object.
                    // Fetch patient visits array via patient ID. /*
                    this.Auth.fetch(`http://localhost:3000/patient/nationalid/${this.props.match.params.id}`)
                    .then(
                      (fetchedPatient) => {
                          this.setState({
                              patient: fetchedPatient
                          })
                      })

                    this.Auth.fetch(`http://localhost:3000/visit/patient/${this.props.location.patient.ID}`)
                    .then(
                        (fetchedVisits) => {
                            this.setState({
                                visits: fetchedVisits
                            });
                        },
                        (error) => {
                            this.setState({
                                error
                            })
                        })

                    // Fetch patient caregiver object.
                    this.Auth.fetch(`http://localhost:3000/caregiverpatient/${this.props.location.patient.ID}`)
                    .then(
                        (fetchedCaregiverPatient) => {
                            if (fetchedCaregiverPatient.length > 0) {
                            console.log(fetchedCaregiverPatient)
                            this.setState({
                                caregiverPatient: {
                                    patient_id: fetchedCaregiverPatient[0].patient_id, 
                                    id: fetchedCaregiverPatient[0].caregiver_id 
                                }
                            })

                    // Fetch patient caregiver object.
                    this.Auth.fetch(`http://localhost:3000/caregiver/${this.state.caregiverPatient.id}`)
                    .then(
                        (fetchedCaregiver) => {
                            console.log(fetchedCaregiver)
                            this.setState({
                                caregivers: fetchedCaregiver
                            });
                        },
                        (error) => {
                            this.setState({
                                error
                            })
                        });                                
                            }

                        },
                        (error) => {
                            this.setState({
                                error
                            })
                        }) 
                }  else {
                    console.log('checking local db');
                    console.log(this.props.location.patient);
                    var key = parseInt(this.props.match.params.id);
                    const openRequest = openDb('amedic', 2);
                    openRequest.then(db => {
                      const tx = db.transaction('patient', 'readonly');
                      const store = tx.objectStore('patient');
                      return store.get(key);
                  }).then(obj => {
                    this.setState({
                      patient: obj
                  })
                    console.log(this.state.patient);

                })
              }

          }


          fetchPatientVisits() {

          }

          render() {
            return (
                <Container>
                {
                    this.Auth.loggedIn() ? '' : <Redirect to='/login' />
                }

                <h2>Patient details</h2>
                <p><b>Name: </b>{this.state.patient.name}</p>
                <p><b>Date of birth: </b>{this.state.patient.date_of_birth}</p>
                <p><b>Mobile No: </b>{this.state.patient.mobile_no}</p>
                <p><b>National ID: </b>{this.state.patient.national_id}</p>
                <p><b>Sex: </b>{this.state.patient.sex}</p>
                <p><b>Village: </b>{this.state.patient.village_name}</p>

                <div>
                {
                    // Check if patient has a caregiver, if so, print out caregiver, else don't.
                    this.printOutCaregivers()
                }
                </div>

                <div class="text-center">
                <Link to={{ pathname:'/alaf/', state: { patient: this.props.location.patient } }}><Button variant="primary">Fill out symptoms sheet</Button></Link>
                <br /><br />
                </div>

                <h2>Visits</h2>
                <Table>

                <thead>
                <tr>
                <th>Date</th>
                { /*
                    <th>Diagnosis?</th>
                    <th>Treatment?</th>
                */ }
                </tr>
                </thead>

                {
                    // Check if patient has visits, if so, print out visits, else don't.
                    this.printOutVisits()
                }

                </Table>

                </Container>
                )
        }
    }

    export default ViewPatient