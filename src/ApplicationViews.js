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
            return true
        } else {
            return false
        }
    }

    // Function to post new user (registered or guest) to API and set state
    postNewUser = object => {
        UserManager.post(object)
            .then(() => UserManager.getAll())
            .then(users => {
                this.setState({
                    users: users
                })
            })
    }

    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={() => {
                    if (this.isAuthenticated()) {
                        return <Redirect to="/home" />
                    } else {
                        return <Welcome />
                    }
                }} />
                <Route path="/login" render={props => {
                    if (this.isAuthenticated()) {
                        return <Redirect to="/home" />
                    } else {
                        return <Login users={this.state.users} {...props} />
                    }
                }} />
                <Route path="/register" render={props => {
                    if (this.isAuthenticated()) {
                        return <Redirect to="/home" />
                    } else {
                        return <Register users={this.state.users} {...props} postNewUser={this.postNewUser} />
                    }
                }} />
                <Route path="/guest" render={props => {
                    if (this.isAuthenticated()) {
                        return <Redirect to="/home" />
                    } else {
                        return <Guest users={this.state.users} {...props} postNewUser={this.postNewUser}/>
                    }
                }} />
            </React.Fragment>
        )
    }
}