import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, NavLink, Nav, Button } from "reactstrap"
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
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }))
    }

    render() {
        return (
            <React.Fragment>
                <Navbar light expand="md">
                    <NavbarBrand>dram</NavbarBrand>
                    <NavbarToggler onClick={this.toggleNav} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar>
                            <NavLink tag={Link} to="/home" onClick={this.toggleNav}>Home</NavLink>
                            <NavLink tag={Link} to="/whiskies" onClick={this.toggleNav}>Whiskies</NavLink>
                            <NavLink tag={Link} to="/tastings" onClick={this.toggleNav}>Tastings</NavLink>
                            <NavLink tag={Link} to="/reviews" onClick={this.toggleNav}>Reviews</NavLink>
                            <Button tag={Link} to="/" onClick={this.handleLogOut} size="sm">Log Out</Button>
                        </Nav>
                    </Collapse>
                </Navbar>
            </React.Fragment >
        )
    }
}