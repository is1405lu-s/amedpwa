import React from 'react'
import {Link} from 'react-router-dom';

class VisitTD extends React.Component {
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
                    <Link to={`/visit/${visit.id}`}>
                        {visit.timestamp === null ? 'Unknown' : visit.timestamp}
                    </Link>
                </td>
                {/*
                            <td>
                            <Link to={`/visit/${visit.id}`}>
                                {visit.diagnosis_id === null ? 'No' : 'Yes'}
                                </Link>
                            </td>
                            <td>
                                <Link to={`/visit/${visit.id}`}>
                                {this.state.hasTreatment === false ? 'No' : 'Yes'}
                                </Link>
                            </td>
                            */}
            </tr>
            </tbody>
        )
    }

    componentDidMount(){
        console.log(this.props.visit)
        /*
        // get all treatmentdiagnosis matching visit.diagnosis_id
        fetch(`http://localhost:3000/treatmentdiagnosis/${this.props.visit.diagnosis_id}`).then(res => res.json())
        .then(
          (fetchedTreatmentDiagnosis) => {
            // if length is < 1, there are no treatments
            if(fetchedTreatmentDiagnosis.length > 0) {
                this.setState({hasTreatment: true})
            }
          },
          (error) => {
            this.setState({
              error
            })
          })
          */
    }

}

export default VisitTD