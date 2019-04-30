// Page welcomes uesr and renders links to login, register, or guest page

import React, { Component } from "react"
import { Link } from "react-router-dom"

export default class Welcome extends Component {
    render() {
        return(
            <React.Fragment>
                Welcome to dram. Please choose one of the following options.
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Link to="/guest">Use as Guest</Link>
            </React.Fragment>
        )
    }
}