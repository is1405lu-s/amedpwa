import React from 'react'
import { Container, Alert, Button, Collapse } from 'react-bootstrap'

class TreatmentComponent extends React.Component {
    constructor(props) {
        super()
        this.state = {
            isOpen: false,
            name: 'nonamediagnose',
            description: 'no description'
        }
    }

    render() {

        const { isOpen } = this.state;

        return (
            <div onClick={() => this.setState({isOpen: !isOpen})}
                 aria-controls={this.state.name}
                 aria-expanded={isOpen}>
                <Alert variant={'primary'}>
                    <Alert.Heading>{this.props.treatment.description}</Alert.Heading>
                    <Collapse in={this.state.isOpen}>
                        <div id={this.state.name}>

                            <p><b>Treatment scheme: </b>{this.props.treatment.treatment_Scheme}</p>
                            <p><b>Drug: </b>{this.props.treatment.drug}</p>
                            <p><b>Drug administration: </b>{this.props.treatment.drug_administration}</p>

                        </div>
                    </Collapse>
                </Alert>
            </div>
        )
    }
}

export default TreatmentComponent