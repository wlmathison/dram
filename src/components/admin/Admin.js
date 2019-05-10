// Page renders the admin page showing admin functions including adding/editing/deleting resources as well as deactivating users

import React, { Component } from "react"
import UserManager from "../../modules/UserManager"



export default class Admin extends Component {

    state = {
        showCreate: true
    }

    // componentDidMount() {
    //     const newState = {}
    //     UserManager.get(sessionStorage.getItem("userId"))
    //         .then(user => {
    //             return (newState.user = user,
    //                 newState.id = user.id,
    //                 newState.userName = user.userName,
    //                 newState.password = user.password,
    //                 newState.email = user.email,
    //                 newState.phoneNumber = user.phoneNumber,
    //                 newState.userTypeId = user.userTypeId,
    //                 newState.isActive = user.isActive
    //             )
    //         }).then(() => this.setState(newState))
    // }

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
            showProfile: false,
        })
        window.scrollTo(0, 0);
    }

    // Function to handle user clicking cancel button and show profile instead of edit form
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
                this.props.updateApplicationViewsState()
                this.props.history.push("/")
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                {/* Below are multiple conditional rendering statements to display the imported file depending on the state(whish is listed first) */}


            </React.Fragment>
        )
    }
}