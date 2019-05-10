import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Navbar, NavbarBrand, NavbarToggler, Collapse, NavLink, Nav, Button } from "reactstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import barrel from "./barrel.svg"
import logo from "./logo.png"
import "./navbar.css"

export default class NavBar extends Component {

    state = {
        isOpen: false
    }

    // Function to toggle state of isOpen to open and close navbar toggle
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
        this.props.updateUserName()
    }

    // Function to close the navbar
    closeNav = () => {
        this.setState({
            isOpen: false
        })
    }

    render() {
        return (
            <React.Fragment>
                <Navbar dark expand="md" className="navbar">
                    <img
                        src={barrel}
                        alt="Barrel"
                        className="navbar-barrel"></img>
                    <NavbarBrand className="navbar-brand"><img src={logo} id="logo" alt="logo"></img></NavbarBrand>
                    <NavbarBrand>{" "}</NavbarBrand>
                    <NavbarBrand>{" "}</NavbarBrand>
                    <NavbarBrand>{" "}</NavbarBrand>
                    <NavLink tag={Link} to="/home" onClick={this.closeNav}>{this.props.userName}</NavLink>
                    <NavbarToggler onClick={this.toggleNav} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar >
                            <NavLink tag={Link} to="/home" onClick={this.toggleNav}>Home</NavLink>
                            <NavLink tag={Link} to="/whiskies" onClick={this.toggleNav}>Whiskies</NavLink>
                            <NavLink tag={Link} to="/tastings" onClick={this.toggleNav}>Tastings</NavLink>
                            <NavLink tag={Link} to="/reviews" onClick={this.toggleNav}>Reviews</NavLink>
                            {(parseInt(sessionStorage.getItem("userTypeId")) === 1) && <NavLink tag={Link} to="/admin" onClick={this.toggleNav}>Admin</NavLink>
                            }
                            {/* Conidtionally rendering link to tasting results if user has submitted their tasting review */}
                            {sessionStorage.getItem("tastingCompleted") && <NavLink tag={Link} to="/results" onClick={this.toggleNav}>Tasting Results</NavLink>
                            }
                            {(parseInt(sessionStorage.getItem("userTypeId")) === 1 || parseInt(sessionStorage.getItem("userTypeId")) === 2) && <Button color="primary" tag={Link} to="/" onClick={this.handleLogOut} size="sm">Log Out</Button>
                            }
                        </Nav>
                    </Collapse>
                </Navbar>
            </React.Fragment >
        )
    }
}