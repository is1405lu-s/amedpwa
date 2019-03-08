import React from 'react'
import { Container, Alert, Button, Collapse } from 'react-bootstrap'
import DiagnoseComponent from './DiagnoseComponent'
import TreatmentComponent from './TreatmentComponent'
import SymptomComponent from './SymptomComponent'
import AuthService from './AuthService'
import { Redirect } from 'react-router-dom'
import {Link} from 'react-router-dom'

class ViewVisit extends React.Component {
    constructor(props) {
        super()
        this.state = {
            viewingHSAVisit: false,
            viewingHEVisit: false,
            visit: {},
            diagnoses: [],
            treatments: [],
            symptoms: null,
            patient_id: null,
            patient: null

        }
        this.printOutDiagnoses = this.printOutDiagnoses.bind(this)
        this.printOutTreatments = this.printOutTreatments.bind(this)
        this.Auth = new AuthService()
    }

    printOutDiagnoses() {

        if(this.state.diagnoses === null || this.state.diagnoses.length < 1) {
            return (<p>Could not find any diagnoses.</p>)
        }

        // Loop through array, printing out each visit.
        if(this.state.diagnoses != null) {
            return this.state.diagnoses.map(function(diagnosis) {
                return(
                    <div key={diagnosis.ID}>
                        <DiagnoseComponent diagnosis={diagnosis} />
                    </div>
                )
            })
        }
    }

    printOutTreatments() {

        if(this.state.treatments.length < 1) {
            return (<p>Could not find any treatments.</p>)
        }

        // Loop through array, printing out each visit.
        if(this.state.treatments != null) {
            return this.state.treatments.map(function(treatment) {
                return(
                    <div key={treatment.ID}>
                        <TreatmentComponent treatment={treatment} />
                    </div>
                )
            })
        }
    }


    fetchTreatments(diagnosis_id) {
        // Fetch treatmentdiagnosis
        if(this.state.visit != null) {
            this.Auth.fetch(`http://localhost:3000/treatmentdiagnosis/${diagnosis_id}`)
                .then(
                    (fetchedTreatmentDiagnosis) => {

                        // Fetch treatments
                        fetchedTreatmentDiagnosis.map((treatmentdiagnosis) => {
                            // Should push each treatment into the state treatment array.
                            this.Auth.fetch(`http://localhost:3000/treatment/${treatmentdiagnosis.treatment_id}`)
                                .then(
                                    (fetchedTreatments) => {
                                        // Change this to push each treatment into the array instead of replacing it:
                                        this.setState({
                                            treatments: fetchedTreatments
                                        })
                                    },
                                    (error) => {
                                        this.setState({
                                            error
                                        })
                                    }
                                )
                        })

                    },
                    (error) => {
                        this.setState({
                            error
                        })
                    }
                )
        }
    }

    fetchDiagnoses(diagnosis_id) {
        if(this.state.visit != null) {
            // Fetch diagnosis
            this.Auth.fetch(`http://localhost:3000/diagnosis/${diagnosis_id}`)
                .then(
                    (fetchedDiagnoses) => {
                        this.setState({
                            diagnoses: fetchedDiagnoses
                        })
                    },
                    (error) => {
                        this.setState({
                            error
                        })
                    }
                )
        }

    }

    fetchSymptoms(symptoms_sheet_id) {
        if(this.state.visit != null) {
            // Fetch symptom sheet
            this.Auth.fetch(`http://localhost:3000/symptoms/${symptoms_sheet_id}`)
                .then(
                    (fetchedSymptoms) => {
                        this.setState({
                            symptoms: fetchedSymptoms
                        })
                    },
                    (error) => {
                        this.setState({
                            error
                        })
                    }
                )
        }

    }

    render() {

        return (
            <Container>
                {
                    this.Auth.loggedIn() ? '' : <Redirect to='/login' />
                }

                <h1>View visit {this.props.match.params.id}</h1>

                <h3>Diagnoses</h3>

                {
                    // For each diagnose found in the array, render a diagnose component:
                    this.printOutDiagnoses()
                }

                <h3>Treatments</h3>

                {
                    // For each diagnose found in the array, render a treatment component:
                    this.printOutTreatments()
                }


                {
                    this.state.symptoms != null ?
                        <div><h3>Symptoms Sheet</h3><SymptomComponent symptomsSheet={this.state.symptoms} /></div> : ''
                }

                <div class="text-center">
                    { this.state.patient != null ?
                        <Link to={{ pathname:`/patient/${this.state.patient.national_id}` }}>
                            <Button variant="primary">Go to patient page</Button>
                        </Link> : ''
                    }

                    <br /><br />
                </div>

            </Container>
        )
    }

    componentWillMount() {

    }

    componentDidMount(){

        this.Auth.fetch(`http://localhost:3000/visit/${this.props.match.params.id}`)
            .then(
                (fetchedVisit) => {

                    this.setState({
                        visit: fetchedVisit[0]
                    })

                    this.fetchTreatments(fetchedVisit[0].diagnosis_id)
                    this.fetchDiagnoses(fetchedVisit[0].diagnosis_id)
                    this.fetchSymptoms(fetchedVisit[0].symptoms_sheet_id)

                    this.setState({
                        patient_id: fetchedVisit[0].patient_id
                    })

                    this.Auth.fetch(`http://localhost:3000/patient/${fetchedVisit[0].patient_id}`)
                        .then(
                            (fetchedPatient) => {
                                this.setState({
                                    patient: fetchedPatient
                                })

                            },
                            (error) => {
                                this.setState({
                                    error
                                })
                            })

                },
                (error) => {
                    console.log(error)
                    this.setState({
                        error
                    })

                }
            )

    }

}

export default ViewVisit