import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
import Welcome from "./components/authentication/Welcome"
import Login from "./components/authentication/Login"
import Register from "./components/authentication/Register"
import Guest from "./components/authentication/Guest"

export default class ApplicationViews extends Component {
    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={() => {
                    return <Welcome />
                }} />
                <Route path="/login" render={() => {
                    return <Login />
                }} />
                <Route path="/register" render={() => {
                    return <Register />
                }} />
                <Route path="/guest" render={() => {
                    return <Guest />
                }} />
            </React.Fragment>
        )
    }
}