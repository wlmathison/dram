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
        myFavorites: [],
        ratings: [],
        tastingCompleted: false
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
    handleDeleteFavorite = id => {
        const newState = {}
        FavoritesManager.delete(id)
            .then(() => FavoritesManager.getExpand())
            .then(favorites => newState.myFavorites = favorites.filter(favorite => favorite.userId === parseInt(sessionStorage.getItem("userId"))))
            .then(() => this.setState(newState))
    }

    // Function to delete a whiskey as a users favorite
    handleConfirmDeleteFavorite = id => {
        const newState = {}
        if (window.confirm("Are you sure you want to delete this favorite")) {
            FavoritesManager.delete(id)
                .then(() => FavoritesManager.getExpand())
                .then(favorites => newState.myFavorites = favorites.filter(favorite => favorite.userId === parseInt(sessionStorage.getItem("userId"))))
                .then(() => this.setState(newState))
        }
    }

    // Function to add a whiskey as a users favorite
    handleAddFavorite = id => {
        let user = parseInt(sessionStorage.getItem("userId"))
        const newState = {}
        FavoritesManager.post(
            {
                userId: user,
                whiskeyId: parseInt(id)
            }
        ).then(() => FavoritesManager.getExpand())
            .then(favorites => newState.myFavorites = favorites.filter(favorite => favorite.userId === parseInt(sessionStorage.getItem("userId"))))
            .then(() => this.setState(newState))
    }

    // Function to handle user clicking Submit Tasting Form button and change status of tastingCompleted to hide ActiveTastingModal
    handleClearTastingForm = event => {
        this.setState({
            tastingCompleted: true
        })
    }

    render() {
        return (
            <React.Fragment>
                <Route path="/home" render={props => {
                    if (this.isAuthenticated()) {
                        return <Home {...props} myFavorites={this.state.myFavorites} handleConfirmDeleteFavorite={this.handleConfirmDeleteFavorite} handleClearTastingForm={this.handleClearTastingForm} tastingCompleted={this.state.tastingCompleted} />
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
                        return <WhiskeyList myFavorites={this.state.myFavorites} handleDeleteFavorite={this.handleDeleteFavorite} handleAddFavorite={this.handleAddFavorite} />
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
                        return <ReviewList users={this.state.users} {...props} myFavorites={this.state.myFavorites} handleDeleteFavorite={this.handleDeleteFavorite} handleAddFavorite={this.handleAddFavorite} />
                    } else {
                        return <Redirect to="/" />
                    }
                }} />
            </React.Fragment>
        )
    }
}