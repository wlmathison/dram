import React, { Component } from "react"
import Navbar from "./components/nav/NavBar"
import ApplicationViews from "./ApplicationViews"

export default class Dram extends Component {

    state = {
        uesrName: ""
    }

    componentDidMount() {
        this.setState({
            userName: sessionStorage.getItem("userName")
        })
    }

    // Function to update state of userName
    updateUserName = () => {
        this.setState({
            userName: sessionStorage.getItem("userName")
        })
    }
    render() {
        return (
            <React.Fragment>
                <Navbar userName={this.state.userName} updateUserName={this.updateUserName} />
                <ApplicationViews updateUserName={this.updateUserName} />
            </React.Fragment>
        )
    }
}