import React from 'react'
import { Container, Alert, Button, Collapse } from 'react-bootstrap'
import DiagnoseComponent from './DiagnoseComponent'
import TreatmentComponent from './TreatmentComponent'
import SymptomComponent from './SymptomComponent'
import AuthService from './AuthService'
import { Redirect } from 'react-router-dom'

class ViewVisit extends React.Component {
    constructor(props) {
        super()
        this.state = {
            viewingHSAVisit: false,
            viewingHEVisit: false,
            diagnoses: [],
            treatments: [],
            symptoms: []
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

    fetchTreatments() {
        // Fetch treatmentdiagnosis
        fetch(`http://localhost:3000/treatmentdiagnosis/${this.props.match.params.diagnosisID}`)
            .then(res => res.json())
            .then(
                (fetchedTreatmentDiagnosis) => {

                    // Fetch treatments
                    fetchedTreatmentDiagnosis.map((treatmentdiagnosis) => {
                        // Should push each treatment into the state treatment array.
                        fetch(`http://localhost:3000/treatment/${treatmentdiagnosis.treatmentID}`).then(res => res.json())
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

    fetchDiagnoses() {
        // Fetch diagnosis
        fetch(`http://localhost:3000/diagnosis/${this.props.match.params.diagnosisID}`)
            .then(res => res.json())
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

    fetchSymptoms() {
        // Fetch symptom sheet
        fetch(`http://localhost:3000/symptoms/${this.props.match.params.symptomID}`).then(res => res.json())
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

    render() {

        return (
            <Container>
                {
                    this.Auth.loggedIn() ? '' : <Redirect to='/login' />
                }

                <h1>View visit {this.props.match.params.patientID}</h1>

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
                    // HSA visits have symptoms sheets, HE visits do not.
                    this.state.viewingHSAVisit ? <h3>Symptoms Sheet</h3> : ''
                }
                {
                    this.state.symptoms != null && this.state.viewingHSAVisit === true ?
                        <SymptomComponent symptomsSheet={this.state.symptoms} /> : ''
                }


            </Container>
        )
    }

    componentWillMount() {

    }

    componentDidMount(){

        // Fetch data.
        this.fetchTreatments()
        this.fetchDiagnoses()
        this.fetchSymptoms()

        // Are we viewing a HE visit?
        this.props.match.params.heID === undefined ?
            this.setState({ viewingHEVisit: false }) : this.setState({ viewingHEVisit: true })

        // Are we viewing a HSA visit?
        this.props.match.params.symptomID === undefined ?
            this.setState({ viewingHSAVisit: false }) : this.setState({ viewingHSAVisit: true })

    }

}

export default ViewVisit
