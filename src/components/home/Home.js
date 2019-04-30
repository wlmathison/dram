// Page renders the homepage showing user information, upcoming tasting, recent reviews, and favorites

import React, { Component } from "react"
import UserProfile from "./UserProfile"
import UserEditForm from "./UserEditForm"
import UserManager from "./../../modules/UserManager"

export default class Home extends Component {

    state = {
        user: "",
        editUser: false
    }

    componentDidMount() {
        UserManager.get(sessionStorage.getItem("userId"))
            .then(user => {
                this.setState({
                    id: user.id,
                    userName: user.userName,
                    password: user.password,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    userTypeId: user.userTypeId,
                    isActive: user.isActive
                })
            })
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
            editUser: true
        })
    }

    handleSaveEditProfile = event => {
        UserManager.put(this.state.id, {
            userName: this.state.userName,
            password: this.state.password,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            userTypeId: this.state.userTypeId,
            isActive: this.state.isActive,
        }).then(() => this.setState({
            editUser: false
        }))
    }

    handleDeactivateAccount = event => {
        if (window.confirm("Are you sure you want to deactivate your account?")) {
            UserManager.patch(this.state.id, {
                isActive: false,
            }).then(() => {
                sessionStorage.clear()
                localStorage.clear()
            }).then(() => {
                this.props.history.push("/home")
            })
        }


    }

    render() {
        return (
            <React.Fragment>
                {this.state.editUser ? (
                    <UserEditForm userName={this.state.userName} email={this.state.email} phoneNumber={this.state.phoneNumber} password={this.state.password} handleDeactivateAccount={this.handleDeactivateAccount} handleSaveEditProfile={this.handleSaveEditProfile} handleFieldChange={this.handleFieldChange} />
                ) : (
                        <UserProfile userName={this.state.userName} email={this.state.email} phoneNumber={this.state.phoneNumber} handleEdit={this.handleEdit} />)}
            </React.Fragment>
        )
    }
}