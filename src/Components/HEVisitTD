import React from 'react'
import {Link} from 'react-router-dom';

class HEVisitTD extends React.Component {
    constructor(props) {
        super()
        this.state = {
            hasTreatment: false
        }
    }

    render() {
        var visit = this.props.visit

        return (
            <tbody>
            <tr>
                <td>
                    <Link to={`/hevisit/${visit.patientID}/${visit.diagnosisID}/${visit.expertID}`}>
                        {visit.timestamp === null ? 'Unknown' : visit.timestamp}
                    </Link>
                </td>
                <td>
                    <Link to={`/hevisit/${visit.patientID}/${visit.diagnosisID}/${visit.expertID}`}>
                        {visit.diagnosisID === null ? 'No' : 'Yes'}
                    </Link>
                </td>
                <td>
                    <Link to={`/hevisit/${visit.patientID}/${visit.diagnosisID}/${visit.expertID}`}>
                        {this.state.hasTreatment === false ? 'No' : 'Yes'}
                    </Link>
                </td>
            </tr>
            </tbody>
        )
    }

    componentDidMount(){
        // get all treatmentdiagnosis matching visit.diagnosisID
        // if length is < 1, there are no treatments
        fetch(`http://localhost:3000/treatmentdiagnosis/${this.props.visit.diagnosisID}`).then(res => res.json())
            .then(
                (fetchedTreatmentDiagnosis) => {

                    if(fetchedTreatmentDiagnosis.length > 0) {
                        this.setState({hasTreatment: true})
                    }
                },
                (error) => {
                    this.setState({
                        error
                    })
})
}
}

export default HEVisitTD
