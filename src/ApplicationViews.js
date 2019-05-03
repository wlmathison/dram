import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
import Welcome from "./components/authentication/Welcome"
import Login from "./components/authentication/Login"
import Register from "./components/authentication/Register"
import Guest from "./components/authentication/Guest"
import UserManager from "./modules/UserManager"
import FavoritesManager from "./modules/FavoritesManager"
import Home from "./components/home/Home"
import WhiskeyList from "./components/whiskies/WhiskeyList"
import TastingList from "./components/tastings/TastingList"
import ReviewList from "./components/reviews/ReviewList"

export default class ApplicationViews extends Component {
    state = {
        users: [],
        myFavorites: []
    }

    componentDidMount() {
        const newState = {}
        UserManager.getAll()
            .then(users => (newState.users = users))
            .then(() => FavoritesManager.getExpand())
            .then(favorites => newState.myFavorites = favorites.filter(favorite => favorite.userId === parseInt(sessionStorage.getItem("userId"))))
            .then(() => this.setState(newState))
    }

    isAuthenticated = () => {
        if (sessionStorage.getItem("userId") !== null) {
            return true
        } else {
            return false
        }
    }

    // Function to post new user (registered or guest) to API and set state
    postNewUser = object => {
        return UserManager.post(object)
            .then(() => UserManager.getAll())
            .then(users => {
                this.setState({
                    users: users
                })
            })
    }

    // Function to delete a whiskey as a users favorite
    handleDeleteFavorite = event => {
        event.preventDefault()
        const newState = {}
        if (window.confirm("Are you sure you want to delete this favorite")) {
            FavoritesManager.delete(event.target.id)
                .then(() => FavoritesManager.getExpand())
                .then(favorites => newState.myFavorites = favorites.filter(favorite => favorite.userId === parseInt(sessionStorage.getItem("userId"))))
                .then(() => this.setState(newState))
        }
    }

    render() {
        return (
            <React.Fragment>
                <Route path="/home" render={props => {
                    if (this.isAuthenticated()) {
                        return <Home {...props} myFavorites={this.state.myFavorites} handleDeleteFavorite={this.handleDeleteFavorite} />
                    } else {
                        return <Redirect to="/" />
                    }
                }} />
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
                        return <Guest users={this.state.users} {...props} postNewUser={this.postNewUser} />
                    }
                }} />
                <Route exact path="/whiskies" render={props => {
                    if (this.isAuthenticated()) {
                        return <WhiskeyList />
                    } else {
                        return <Redirect to="/" />
                    }
                }} />
                <Route exact path="/tastings" render={props => {
                    if (this.isAuthenticated()) {
                        return <TastingList users={this.state.users} />
                    } else {
                        return <Redirect to="/" />
                    }
                }} />
                <Route exact path="/reviews" render={props => {
                    if (this.isAuthenticated()) {
                        return <ReviewList users={this.state.users} {...props} />
                    } else {
                        return <Redirect to="/" />
                    }
                }} />
            </React.Fragment>
        )
    }
}