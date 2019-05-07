import React, { Component } from "react"
import Navbar from "./components/nav/NavBar"
import ApplicationViews from "./ApplicationViews"

export default class Dram extends Component {

    render() {
        return (
            <React.Fragment>
                <Navbar />
                <ApplicationViews />
            </React.Fragment>
        )
    }
}