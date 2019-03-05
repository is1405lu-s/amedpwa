import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Route, Switch, Redirect } from 'react-router-dom'

class ScreeningForm extends React.Component {

    constructor(props) {
        super()
        this.state = {
            // Ask and Look assessment properties:
            description: '',                    // VARCHAR
            cough: '',                          // BOOL
            coughDays: 0,                      // INT, default vaule
            diarrhoea: '',                      // BOOL
            diarrhoeaDays: 0,                  // INT, default vaule
            bloodInStool: '',                   // VARCHAR
            fever: '',                          // INT
            feverDays: 0,                      // INT, default value
            convulsions: '',                    // VARCHAR
            difficultToEatDrink: '',            // BOOL
            cannotEatDrink: '',                 // BOOL
            vomiting: '',                       // BOOL
            vomitsEverything: '',               // BOOL
            redEyes: '',                        // BOOL
            redEyesDays: 0,                    // INT, default value
            difficultiesToSee: '',              // BOOL
            difficultiesToSeeDays: 0,          // INT, default value
            chestIndraw: '',                    // VARCHAR
            breathingFreq: '',                  // INT
            sleepy: '',                         // VARCHAR
            unconscious: '',                    // VARCHAR
            palmarPalor: '',                    // VARCHAR
            muac: '',                           // VARCHAR
            swollenFeet: '',                    // VARCHAR

            submittedForm: false
        }

        this.handleChange = this.handleChange.bind(this)
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

    handleSubmit(event) {
        // TODO: Implement validation here.

        console.log(this.state)
        this.setState({submittedForm: true})
        // event.preventDefault();
    }

    render() {
        return (
            <div class="container">
                <h1>Ask and look assessment form</h1>
                <Form onSubmit={this.handleSubmit}>

                    <Form.Group controlId="formStudyID">
                        <Form.Label>Patient name</Form.Label>
                        <Form.Control
                            readOnly
                            name="patient"
                            value={typeof(this.props.location.patient) === 'undefined' ? 'No patient found.' : this.props.location.patient.name}
                            onChange={this.handleChange}
                            type="text"
                            placeholder={typeof(this.props.location.patient) === 'undefined' ?
                                'No patient found.' : this.props.location.patient.name}
                        />
                    </Form.Group>

                    <Form.Group controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            required
                            name="description"
                            value={this.state.description}
                            onChange={this.handleChange}
                            type="description"
                            placeholder="Enter a description."
                        />
                    </Form.Group>

                    <Form.Group controlId="formCoughing">
                        <Form.Check
                            name="cough"
                            defaultChecked={this.state.cough}
                            onChange={this.handleChange}
                            type="checkbox"
                            label="Tick the box if the patient is coughing."
                        />
                    </Form.Group>

                    <Form.Group controlId="formCoughingDays" style={this.state.cough ? {display: ''} : {display: 'none'}}>
                        <Form.Label>For how many days has the patient experienced coughing?</Form.Label>
                        <Form.Control
                            required={this.state.cough}
                            name="coughDays"
                            onChange={this.handleChange}
                            value={this.state.coughDays}
                            type="number"
                            placeholder="Enter how many days the patient has been coughing."
                        />
                    </Form.Group>

                    <Form.Group controlId="formDiarrhoea">
                        <Form.Check
                            name="diarrhoea"
                            defaultChecked={this.state.diarrhoea}
                            onChange={this.handleChange}
                            type="checkbox"
                            label="Tick the box if the patient is experiencing diarrhoea."
                        />
                    </Form.Group>

                    <Form.Group style={this.state.diarrhoea ? {display: ''} : {display: 'none'}} controlId="formDiarrhoeaDays">
                        <Form.Label>For how many days has the patient experienced diarrhoea?</Form.Label>
                        <Form.Control
                            required={this.state.diarrhoea}
                            name="diarrhoeaDays"
                            onChange={this.handleChange}
                            value={this.state.diarrhoeaDays}
                            type="number"
                            placeholder="Enter how many days the patient has been experiencing diarrhoea."
                        />
                    </Form.Group>

                    <Form.Group controlId="formBloodInStool">
                        <Form.Label>Has the patient experienced blood in stool?</Form.Label>
                        <Form.Control
                            required
                            name="bloodInStool"
                            onChange={this.handleChange}
                            value={this.state.bloodInStool}
                            type="description"
                            placeholder="Enter a description."
                        />
                    </Form.Group>

                    <Form.Group controlId="formFever">
                        <Form.Label>Does the patient have a fever?</Form.Label>
                        <Form.Control
                            required
                            name="fever"
                            onChange={this.handleChange}
                            value={this.state.fever}
                            type="number"
                            placeholder="Enter degrees."
                        />
                    </Form.Group>

                    <Form.Group controlId="formFever">
                        <Form.Label>For how many days has the patient had a fever?</Form.Label>
                        <Form.Control
                            required
                            name="feverDays"
                            onChange={this.handleChange}
                            value={this.state.feverDays}
                            type="number"
                            placeholder="Enter amount of days."
                        />
                    </Form.Group>

                    <Form.Group controlId="formConvulsions">
                        <Form.Label>Does the patient experience convulsions?</Form.Label>
                        <Form.Control
                            required
                            name="convulsions"
                            onChange={this.handleChange}
                            value={this.state.convulsions}
                            type="description"
                            placeholder="Enter a description."
                        />
                    </Form.Group>

                    <Form.Check
                        name="difficultToEatDrink"
                        defaultChecked={this.state.difficultToEatDrink}
                        onChange={this.handleChange}
                        type="checkbox"
                        label="Tick the box if the patient have difficulties eating and/or drinking."
                    />

                    <br />

                    <Form.Check
                        name="cannotEatDrink"
                        defaultChecked={this.state.cannotEatDrink}
                        onChange={this.handleChange}
                        type="checkbox"
                        label="Tick the box if the patient can not eat and/or drink at all."
                    />

                    <br />

                    <Form.Check
                        name="vomiting"
                        defaultChecked={this.state.vomiting}
                        onChange={this.handleChange}
                        type="checkbox"
                        label="Tick the box if the patient is experiencing vomiting."
                    />

                    <br />

                    <Form.Check
                        name="vomitsEverything"
                        defaultChecked={this.state.vomitsEverything}
                        onChange={this.handleChange}
                        type="checkbox"
                        label="Tick the box if the patient vomits everything."
                    />

                    <br />

                    <Form.Check
                        name="redEyes"
                        defaultChecked={this.state.redEyes}
                        onChange={this.handleChange}
                        type="checkbox"
                        label="Tick the box if the patient has red eyes."
                    />

                    <Form.Group controlId="formRedEyes" style={this.state.redEyes ? {display: ''} : {display: 'none'}}>
                        <br />
                        <Form.Label>For how many days has the patient had red eyes?</Form.Label>
                        <Form.Control
                            required={this.state.redEyes}
                            name="redEyesDays"
                            onChange={this.handleChange}
                            value={this.state.redEyesDays}
                            type="number"
                            placeholder="Enter days."
                        />
                    </Form.Group>

                    <br />

                    <Form.Check
                        name="difficultiesToSee"
                        defaultChecked={this.state.difficultiesToSee}
                        onChange={this.handleChange}
                        type="checkbox"
                        label="Tick the box if the patient has difficulties seeing."
                    />

                    <br />

                    <Form.Group
                        controlId="formDifficultiesSeeing"
                        style={this.state.difficultiesToSee ? {display: ''} : {display: 'none'}}
                    >
                        <Form.Label>For how many days has the patient had difficulties seeing?</Form.Label>
                        <Form.Control
                            required={this.state.difficultiesToSee}
                            name="difficultiesToSeeDays"
                            onChange={this.handleChange}
                            value={this.state.difficultiesToSeeDays}
                            type="number"
                            placeholder="Enter days."
                        />
                    </Form.Group>

                    <Form.Group controlId="formChestIndraw">
                        <Form.Label>Is the patient's chest indrawn?</Form.Label>
                        <Form.Control
                            required
                            name="chestIndraw"
                            onChange={this.handleChange}
                            value={this.state.chestIndraw}
                            type="description"
                            placeholder="Enter a description."
                        />
                    </Form.Group>
                    <Form.Group controlId="formBreathingFreq">
                        <Form.Label>What is the patient breathing frequency?</Form.Label>
                        <Form.Control
                            required={this.state.breathingFreq}
                            name="breathingFreq"
                            onChange={this.handleChange}
                            value={this.state.breathingFreq}
                            type="number"
                            placeholder="Enter breathing frequency."
                        />
                    </Form.Group>
                    <Form.Group controlId="formSleepy">
                        <Form.Label>Is the patient sleepy?</Form.Label>
                        <Form.Control
                            required
                            name="sleepy"
                            onChange={this.handleChange}
                            value={this.state.sleepy}
                            type="description"
                            placeholder="Enter a description."
                        />
                    </Form.Group>
                    <Form.Group controlId="formUnconscious">
                        <Form.Label>Is the patient unconscious?</Form.Label>
                        <Form.Control
                            required
                            name="unconscious"
                            onChange={this.handleChange}
                            value={this.state.unconscious}
                            type="description"
                            placeholder="Enter a description."
                        />
                    </Form.Group>
                    <Form.Group controlId="formPalmarPallor">
                        <Form.Label>Is the patient experiencing Palmar Pallor?</Form.Label>
                        <Form.Control
                            required
                            name="palmarPalor"
                            onChange={this.handleChange}
                            value={this.state.palmarPalor}
                            type="description"
                            placeholder="Enter a description."
                        />
                    </Form.Group>
                    <Form.Group controlId="formMuac">
                        <Form.Label>What is the size of the patient middle upper arm circumference?</Form.Label>
                        <Form.Control
                            required
                            name="muac"
                            onChange={this.handleChange}
                            value={this.state.muac}
                            type="description"
                            placeholder="Enter the size."
                        />
                    </Form.Group>
                    <Form.Group controlId="formSwollenFeet">
                        <Form.Label>Is the patient experiencing swollen feet?</Form.Label>
                        <Form.Control
                            required
                            name="swollenFeet"
                            onChange={this.handleChange}
                            value={this.state.swollenFeet}
                            type="description"
                            placeholder="Enter a description."
                        />
                    </Form.Group>
                    <Button className="float-right" variant="primary" type="submit">
                        Continue
                    </Button>
                </Form>
                {
                    this.state.submittedForm === false ? '' : <Redirect to={{
                        pathname: '/alaf/review',
                        patient: this.props.location.patient,
                        alafForm: this.state
                    }}
                    />
                }
            </div>
        )
    }
}
export default ScreeningForm
