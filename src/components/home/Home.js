// Page renders the homepage showing user information, upcoming tasting, recent reviews, and favorites

import React, { Component } from "react"
import UserProfile from "./UserProfile"
import UserEditForm from "./UserEditForm"
import UserManager from "./../../modules/UserManager"
import TastingManager from "./../../modules/TastingManager"
import UpcomingTastingCard from "./UpcomingTastingCard"
import FavoritesCard from "./FavoritesCard"
import ActiveTastingModal from "./ActiveTastingModal"

export default class Home extends Component {

    state = {
        user: {},
        editUser: false,
        showProfile: true,
        tastingScheduled: true,
        activeTasting: {},
        tastingIsActive: false,
        review: "",
        rating: ""
    }

    componentDidMount() {
        const newState = {}
        UserManager.get(sessionStorage.getItem("userId"))
            .then(user => {
                return (newState.user = user,
                    newState.id = user.id,
                    newState.userName = user.userName,
                    newState.password = user.password,
                    newState.email = user.email,
                    newState.phoneNumber = user.phoneNumber,
                    newState.userTypeId = user.userTypeId,
                    newState.isActive = user.isActive
                )
            }).then(() => TastingManager.getExpand())
            .then(tastings => {
                if (tastings.some(tasting => tasting.active)) {
                    newState.activeTasting = tastings.find(tasting => tasting.active)
                    newState.tastingIsActive = true
                }
            }).then(() => this.setState(newState))
    }

    // Function to change state of editUser when button clicked
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    // Function to change state of editUser to true, udate state with props, and conditionally render edit form
    handleEdit = event => {
        this.setState({
            editUser: true,
            showProfile: false
        })
    }

    handleCancelEdit = event => {
        this.setState({
            editUser: false,
            showProfile: true
        })
    }

    // Function to save edits made to profile, PUT them into API, and then render the user profile again
    handleSaveEditProfile = event => {
        UserManager.put(this.state.id, {
            userName: this.state.userName,
            password: this.state.password,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            userTypeId: this.state.userTypeId,
            isActive: this.state.isActive,
        }).then(() => this.setState({
            editUser: false,
            showProfile: true
        }))
    }

    // Function to confirm user wants to deactivate accoutn, PATCH the isActive change, clear out local and session storage, and then return user to /home
    handleDeactivateAccount = event => {
        if (window.confirm("Are you sure you want to deactivate your account?")) {
            UserManager.patch(this.state.id, {
                isActive: false,
            }).then(() => {
                sessionStorage.clear()
                localStorage.clear()
            }).then(() => {
                this.props.history.push("/")
            })
        }
    }


    render() {
        return (
            <React.Fragment>
                {this.state.tastingIsActive && !this.props.tastingCompleted && <ActiveTastingModal handleJoinActiveTasting={this.handleJoinActiveTasting} activeTasting={this.state.activeTasting} handleClearTastingForm={this.props.handleClearTastingForm} />
                }
                {this.state.editUser && <UserEditForm userName={this.state.userName} email={this.state.email} phoneNumber={this.state.phoneNumber} password={this.state.password} handleDeactivateAccount={this.handleDeactivateAccount} handleSaveEditProfile={this.handleSaveEditProfile} handleFieldChange={this.handleFieldChange} handleCancelEdit={this.handleCancelEdit} />
                }
                {this.state.showProfile && <UserProfile userName={this.state.userName} email={this.state.email} phoneNumber={this.state.phoneNumber} handleEdit={this.handleEdit} />}

                {this.state.tastingScheduled && (parseInt(sessionStorage.getItem("userTypeId")) === 1 || parseInt(sessionStorage.getItem("userTypeId")) === 2) && <UpcomingTastingCard />
                }
                {(parseInt(sessionStorage.getItem("userTypeId")) === 1 || parseInt(sessionStorage.getItem("userTypeId")) === 2) && <FavoritesCard myFavorites={this.props.myFavorites} handleConfirmDeleteFavorite={this.props.handleConfirmDeleteFavorite} />
                }
            </React.Fragment>
        )
    }
}