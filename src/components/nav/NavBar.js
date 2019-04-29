import React, { Component } from "react"
import { Link } from "react-router-dom"
import "bulma/css/bulma.css"

export default class NavBar extends Component {
    handleLogOut = event => {
        sessionStorage.clear()
        localStorage.clear()
    }

    render() {
        return(
            <React.Fragment>
                <nav className="navbar" role="navigation" aria-label="main-navigation">
                <div className="navbar-brand">
            Hello
                </div>
                </nav>
            </React.Fragment>
        )
    }
}