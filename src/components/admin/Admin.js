// Page renders the admin page showing admin functions including adding/editing/deleting resources as well as deactivating users

import React, { Component } from "react"
import UserManager from "./../../modules/UserManager"
import CreateNewResource from "./CreateNewResource"
import EditResource from "./EditResource"
import DeleteResource from "./DeleteResource"
import ActivateDeactivateUser from "./ActivateDeactivateUser"
import ActivateUser from "./ActivateUser"
import DeactivateUser from "./DeactivateUser"
import CreateNewCategory from "./CreateNewCategory"
import CreateNewDistillery from "./CreateNewDistillery"



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
        showDelete: true,
        showCreateCategory: false,
        showCreateDistillery: false
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
            showDelete: true,
            showCreateCategory: false,
            showCreateDistillery: false
        })
    }

    // Function to handle refreshing admin page after user clicks a button
    handleRefresh = event => {
        this.setState({
            showActivateDeactivate: true,
            showActivate: false,
            showDeactivate: false,
            showCreate: true,
            showEdit: true,
            showDelete: true,
            showCreateCategory: false,
            showCreateDistillery: false
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

    // Function to handle user clicking Activate User and display inactive user dropdown
    handleActivateUser = event => {
        event.preventDefault()
        this.setState({
            showActivate: true,
            showActivateDeactivate: false
        })
    }

    // Function to handle user clicking Deactivate User and display active user dropdown
    handleDeactivateUser = event => {
        event.preventDefault()
        this.setState({
            showDeactivate: true,
            showActivateDeactivate: false
        })
    }

    // Function to handle user selecting a user to activate, change isActive to true for the user in the database, and update state of users
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

    // Function to handle user selecting a user to deactivate, cahnge isActive to false for the user in the database, and update state of users
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

    // Function to handle user clicking Create New Category and display create category form
    handleCreateCategory = event => {
        event.preventDefault()
        this.setState({
            showCreateCategory: true,
            showCreate: false
        })
    }

    // Function to handle refreshing admin page after user clicks a button
    handleRefresh = event => {
        this.setState({
            showActivateDeactivate: true,
            showActivate: false,
            showDeactivate: false,
            showCreate: true,
            showEdit: true,
            showDelete: true,
            showCreateCategory: false
        })
    }

    // Function to handle user clicking Create New Distillery and display create distillery form
    handleCreateDistillery = event => {
        event.preventDefault()
        this.setState({
            showCreateDistillery: true,
            showCreate: false
        })
    }


    render() {
        return (
            <React.Fragment>
                {/* Below are multiple conditional rendering statements to display the imported file depending on the state(whish is listed first) */}
                {this.state.showActivateDeactivate && <ActivateDeactivateUser handleActivateUser={this.handleActivateUser} handleDeactivateUser={this.handleDeactivateUser} />}
                {this.state.showActivate && <ActivateUser handleCancel={this.handleCancel} users={this.state.users} handleActivate={this.handleActivate} />}
                {this.state.showDeactivate && <DeactivateUser handleCancel={this.handleCancel} users={this.state.users} handleDeactivate={this.handleDeactivate} />}
                {this.state.showCreate && <CreateNewResource handleCreateCategory={this.handleCreateCategory} handleCreateDistillery={this.handleCreateDistillery} />}
                {this.state.showCreateCategory && <CreateNewCategory handleCancel={this.handleCancel} handleRefresh={this.handleRefresh} />}
                {this.state.showCreateDistillery && <CreateNewDistillery handleCancel={this.handleCancel} handleRefresh={this.handleRefresh} />}
                {this.state.showEdit && <EditResource />}
                {this.state.showDelete && <DeleteResource />}
            </React.Fragment>
        )
    }
}