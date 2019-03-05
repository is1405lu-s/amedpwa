import React from 'react'

import Header from '../Components/Header'
import ScreeningForm from '../Components/ScreeningForm'
import PatientFind from '../Components/PatientFind'
import reviewForm from '../Components/reviewForm'
import ViewPatient from '../Components/ViewPatient'
import ViewVisit from '../Components/ViewVisit'
import DiagnoseComponent from '../Components/DiagnoseComponent'

import { Route, Switch, Redirect } from 'react-router-dom'
import Login from '../Components/Login'

export const Routes = () => {
    return (
        <div>
            <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
                integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
                crossorigin="anonymous"
            />

            <Header />
            
            <Switch>
                <Route exact path="/home" component={ScreeningForm} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/alaf" component={ScreeningForm} />
                <Route exact path="/alaf/review" component={reviewForm} />
                <Route exact path="/">
                    <Redirect to="/patient" />
                </Route>
                <Route exact path="/patient" component={PatientFind} />
                <Route path="/patient/:id" component={ViewPatient} />
                <Route path="/hsavisit/:patientID/:diagnosisID/:hsaID/:symptomID" component={ViewVisit} />
                <Route path="/hevisit/:patientID/:diagnosisID/:heID" component={ViewVisit} />
                <Route path="/diagnosis" component={DiagnoseComponent} />
            </Switch>
        </div>
    )
}
