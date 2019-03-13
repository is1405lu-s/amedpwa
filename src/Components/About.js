import React from "react";
import {Button, Container} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";

class About extends React.Component {

    render() {
        return (
            <Container>
                <h1 align = "center">Meet the team</h1>
                <p><br/>
                <b>Matilda Svensson, co-founder</b>
                    <br/>
                    Experience working for NGOs and the Swedish Government. Has a Bachelor’s degree in HR and is currently studying to be a nurse. Became part of this project to learn about alternative ways to offer healthcare and to actually make a difference.
                    <br/>
                    <br/>
                    <b>My Andersson, co-founder</b>
                    <br/>
                    Social worker with experience from working in different countries both within NGO’s and within research. Been involved in previous research projects regarding healthcare in Malawi. Became part of this project with hopes of creating a sustainable solution to a big reason for inequality in the world – the right to qualitative care.
                    <br/>
                    <br/>
                    <b>Bo Andersson, Research and development</b>
                    <br/>
                    Associate Professor in Informatics at Lund University, with experience from previous research projects in Malawi. Knowing the capacity of technology and commitment, wanting to use what has already been created – becoming part of this project was mostly about creating the platform for others to be able to access all that.
                    <br/>
                    <br/>

                </p>
                <h1 align="center"> Developers </h1>
                <p>
                    <br/>
                    <b>Ludwig Entzenberg, Isabella Luong, Per Lachmann, Joel Klingberg, Astrid Blomberg Cedergren</b>
                </p>



            </Container>
        )
    }
}
export default About