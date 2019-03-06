import React from 'react'
import { Container, Alert, Button, Collapse } from 'react-bootstrap'

class SymptomComponent extends React.Component {
    constructor(props) {
        super()
        this.state = {
            isOpen: false,

            // Ask and Look assessment properties:
            description: '',                    // VARCHAR
            cough: '',                          // BOOL
            coughDays: '',                      // INT
            diarrhoea: '',                      // BOOL
            diarrhoeaDays: '',                  // BOOL
            bloodInStool: '',                   // VARCHAR
            fever: '',                          // INT
            feverDays: '',                      // INT
            convulsions: '',                    // VARCHAR
            difficultToEatDrink: '',            // BOOL
            cannotEatDrink: '',                 // BOOL
            vomiting: '',                       // BOOL
            vomitsEverything: '',               // BOOL
            redEyes: '',                        // BOOL
            redEyesDays: '',                    // INT
            difficultiesToSee: '',              // BOOL
            difficultiesToSeeDays: '',          // INT
            chestIndraw: '',                    // VARCHAR
            breathingFreq: '',                  // INT
            sleepy: '',                         // VARCHAR
            unconscious: '',                    // VARCHAR
            palmarPalor: '',                    // VARCHAR
            muac: '',                           // VARCHAR
            swollenFeet: '',                    // VARCHAR
        }
    }

    render() {

        const { isOpen } = this.state;
        var symptomsSheet = this.props.symptomsSheet

        return (
            <div onClick={() => this.setState({isOpen: !isOpen})}
                 aria-controls={this.state.name}
                 aria-expanded={isOpen}>
                <Alert variant={'secondary'}>
                    <Alert.Heading>{`Sheet ID: ${symptomsSheet.ID}`}</Alert.Heading>
                    <Collapse in={this.state.isOpen}>
                        <div id={this.state.name}>
                            <p><b>Description: </b>{symptomsSheet.description}</p>
                            <p><b>Is the patient coughing? </b>{symptomsSheet.cough ? 'Yes.' : 'No.'}</p>
                            <p><b>How many days has the patient been coughing? </b>{symptomsSheet.cough_days} days.</p>
                            <p><b>Does the patient have diarrhoea? </b>{symptomsSheet.diarrhoea ? 'Yes.' : 'No.'}</p>
                            <p><b>How many days has the patient had diarrhoea? </b>{symptomsSheet.diarrhoea_days} days.</p>
                            <p><b>Does the patient have blood in stool? </b>{symptomsSheet.blood_in_stool}</p>
                            <p><b>What body temperature does the patient have? </b>{symptomsSheet.fever}</p>
                            <p><b>How many days has the patient had a fever? </b>{symptomsSheet.fever_days} days.</p>
                            <p><b>Does the patient have convulsions? </b>{symptomsSheet.convulsions}</p>
                            <p><b>Does the patient have difficulties eating or drinking? </b>{symptomsSheet.difficult_to_eat_drink ? 'Yes.' : 'No.'}</p>
                            <p><b>Is the patient unable to eat and/or drink? </b>{symptomsSheet.cannot_eat_drink ? 'Yes.' : 'No.'}</p>
                            <p><b>Does the patient vomit? </b>{symptomsSheet.vomiting ? 'Yes.' : 'No.'}</p>
                            <p><b>Does the patient vomit everything? </b>{symptomsSheet.vomits_everything ? 'Yes.' : 'No.'}</p>
                            <p><b>Does the patient have red eyes? </b>{symptomsSheet.red_eyes ? 'Yes.' : 'No.'}</p>
                            <p><b>If the patient has red eyes, how many days has the patient had red eyes for? </b>{symptomsSheet.red_eyes_days} days.</p>
                            <p><b>Does the patient have difficulties to see? </b>{symptomsSheet.difficulties_to_see ? 'Yes.' : 'No.'}</p>
                            <p><b>How many days has the patient had difficulties seeing? </b>{symptomsSheet.difficulties_to_see_days} days.</p>
                            <p><b>Is the patient's chest indrawn? </b>{symptomsSheet.chest_indraw}</p>
                            <p><b>What is the patient breathing frequency? </b>{symptomsSheet.breathing_freq}</p>
                            <p><b>Is the patient sleepy? </b>{symptomsSheet.sleepy}</p>
                            <p><b>Is the patient unconscious? </b>{symptomsSheet.unconscious}</p>
                            <p><b>Does the patient have Palmar Pallor? </b>{symptomsSheet.palmar_palor}</p>
                            <p><b>What is the patient middle upper arm circumference? </b>{symptomsSheet.muac}</p>
                            <p><b>Does the patient have swollen feet? </b>{symptomsSheet.swollen_feet}</p>
                        </div>
                    </Collapse>
                </Alert>
            </div>
        )
    }
}
export default SymptomComponent