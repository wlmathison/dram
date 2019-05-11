// Page renders the admin page showing admin functions including adding/editing/deleting resources as well as deactivating users

import React, { Component } from "react"
import UserManager from "./../../modules/UserManager"
import CreateNewResource from "./CreateNewResource"
import EditResource from "./EditResource"
import DeleteResource from "./DeleteResource"
import ActivateDeactivateUser from "./ActivateDeactivateUser"
import ActivateUser from "./ActivateUser"
import DeactivateUser from "./DeactivateUser"



export default class Admin extends Component {

    state = {
        categories: [],
        users: [],
        manufacturers: [],
        ratings: [],
        reviews: [],
        tastings: [],
        tastingAttendance: [],
        tastingSelection: [],
        whiskies: [],
        showActivateDeactivate: true,
        showActivate: false,
        showDeactivate: false,
        showCreate: true,
        showEdit: true,
        showDelete: true
    }

    componentDidMount() {
        const newState = {}
        UserManager.getAll()
            .then(users => (newState.users = users))
            .then(() => this.setState(newState))
    }

    // Function to change state of editUser when button clicked
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    // Function to change state of editUser to true, udate state with props, and conditionally render edit form
    // handleEdit = event => {
    //     this.setState({
    //         editUser: true,
    //         showProfile: false,
    //     })
    //     window.scrollTo(0, 0);
    // }

    // Function to handle user clicking cancel button and return to admin form
    handleCancel = event => {
        event.preventDefault()
        this.setState({
            showActivateDeactivate: true,
            showActivate: false,
            showDeactivate: false,
            showCreate: true,
            showEdit: true,
            showDelete: true
        })
    }

    // Function to save edits made to profile, PUT them into API, and then render the user profile again
    // handleSaveEditProfile = event => {
    //     UserManager.put(this.state.id, {
    //         userName: this.state.userName,
    //         password: this.state.password,
    //         email: this.state.email,
    //         phoneNumber: this.state.phoneNumber,
    //         userTypeId: this.state.userTypeId,
    //         isActive: this.state.isActive,
    //     }).then(() => this.setState({
    //         editUser: false,
    //         showProfile: true
    //     }))
    // }

    // Function to confirm user wants to deactivate accoutn, PATCH the isActive change, clear out local and session storage, and then return user to /home
    // handleDeactivateAccount = event => {
    //     if (window.confirm("Are you sure you want to deactivate your account?")) {
    //         UserManager.patch(this.state.id, {
    //             isActive: false,
    //         }).then(() => {
    //             sessionStorage.clear()
    //             localStorage.clear()
    //         }).then(() => {
    //             this.props.updateApplicationViewsState()
    //             this.props.history.push("/")
    //         })
    //     }
    // }

    // Function to handle user clicking Activate Inactive User and change state of 
    handleActivateUser = event => {
        event.preventDefault()
        this.setState({
            showActivate: true,
            showActivateDeactivate: false
        })
    }

    // Function to handle user clicking Deactivate User and change state of 
    handleDeactivateUser = event => {
        event.preventDefault()
        this.setState({
            showDeactivate: true,
            showActivateDeactivate: false
        })
    }

    handleActivate = event => {
        event.preventDefault()
        const newState = {
            showActivateDeactivate: true,
            showActivate: false
        }
        UserManager.patch(event.target.id, {
            isActive: true
        }).then(() => UserManager.getAll())
            .then(users => (newState.users = users))
            .then(() => this.setState(newState))
    }

    handleDeactivate = event => {
        event.preventDefault()
        const newState = {
            showActivateDeactivate: true,
            showDeactivate: false
        }
        UserManager.patch(event.target.id, {
            isActive: false
        }).then(() => UserManager.getAll())
            .then(users => (newState.users = users))
            .then(() => this.setState(newState))
    }

    render() {
        return (
            <React.Fragment>
                {/* Below are multiple conditional rendering statements to display the imported file depending on the state(whish is listed first) */}
                {this.state.showActivateDeactivate && <ActivateDeactivateUser handleActivateUser={this.handleActivateUser} handleDeactivateUser={this.handleDeactivateUser} />}
                {this.state.showActivate && <ActivateUser handleCancel={this.handleCancel} users={this.state.users} handleActivate={this.handleActivate} />}
                {this.state.showDeactivate && <DeactivateUser handleCancel={this.handleCancel} users={this.state.users} handleDeactivate={this.handleDeactivate} />}
                {this.state.showCreate && <CreateNewResource />}
                {this.state.showEdit && <EditResource />}
                {this.state.showDelete && <DeleteResource />}
            </React.Fragment>
        )
    }
}