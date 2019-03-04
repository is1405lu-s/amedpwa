import React from 'react'

// Bootstrap imports:
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import AuthService from './AuthService'
import { Redirect } from 'react-router-dom'

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {username: ''}

        this.Auth = new AuthService()
        this.logOut = this.logOut.bind(this)
    }

    componentDidMount(){
        if(this.Auth.loggedIn) {
            this.setState({username: this.Auth.getUsername() })
        }

    }

    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Amedic</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/patient">Find patient</Nav.Link>
                        {
                            this.Auth.loggedIn() ?
                                <NavDropdown title={`Logged in as: ${this.state.username}`} id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={this.logOut} href="/login">Log out</NavDropdown.Item>
                                    {/*
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                  */}
                                </NavDropdown> : <Nav.Link href="/login">Log in</Nav.Link>
                        }

                    </Nav>
                    {/*
              <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
              </Form>

            */}
                </Navbar.Collapse>
            </Navbar>
        )
    }

    logOut(){
        this.Auth.logout()
    }
}

export default Header
