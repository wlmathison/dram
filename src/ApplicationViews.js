import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
import Welcome from "./components/authentication/Welcome"
import Login from "./components/authentication/Login"
import Register from "./components/authentication/Register"
import Guest from "./components/authentication/Guest"
import UserManager from "./modules/UserManager"

export default class ApplicationViews extends Component {
    state = {
        users: []
    }

    componentDidMount() {
        const newState = {}
        UserManager.getAll()
            .then(users => (newState.users = users))
            .then(() => this.setState(newState))
    }

    isAuthenticated = () => {
        if (sessionStorage.getItem("userId") !== null) {
            return true
        } else if (localStorage.getItem("userId") !== null) {
            sessionStorage.setItem("userId", localStorage.getItem("userId"))
            sessionStorage.setItem("userName", localStorage.getItem("userName"))
            return true
        } else {
            return false
        }
    }

    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={() => {
                    return <Welcome />
                }} />
                <Route path="/login" render={props => {
                    if (this.isAuthenticated()) {
                        return <Redirect to="/" />
                    } else {
                        return <Login users={this.state.users} {...props} />

                    }
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