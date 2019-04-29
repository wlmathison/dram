import React, { Component } from "react"
import { Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, NavLink, Nav } from "reactstrap"
import "bootstrap/dist/css/bootstrap.min.css"

export default class NavBar extends Component {

    state = {
        isOpen: false,
    }

    toggleNav = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }))
    }

    // Function to clear out session storage and local storage when a user clicks the log out button
    handleLogOut = event => {
        sessionStorage.clear()
        localStorage.clear()
    }

    render() {
        return (
            <React.Fragment>
                <Navbar>
                    <NavbarBrand>dram</NavbarBrand>
                    <NavbarToggler onClick={this.toggleNav} />
                    <Collapse isOpen={this.isOpen} navbar>
                        <Nav>
                            <NavItem>
                                <NavLink to="/whiskies">Whiskies</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </React.Fragment >
        )
    }
}