// Page renders the homepage showing user information, upcoming tasting, recent reviews, and favorites

import React, { Component } from "react"
import UserProfile from "./UserProfile"
import UserManager from "./../../modules/UserManager"

export default class Home extends Component {

    state = {
        user: ""
    }

    componentDidMount() {
        UserManager.get(sessionStorage.getItem("userId"))
            .then(user => {
                this.setState({
                    user: user
                })
            })
    }

    render() {
        return (
            <React.Fragment>
                <UserProfile user={this.state.user} />
            </React.Fragment>
        )
    }
}