// Page displays all whiskies and search form to limit whiskies

import React, { Component } from "react"
import { Card, CardHeader } from "reactstrap"
import WhiskeyManager from "./../../modules/WhiskeyManager"
import WhiskeyIndividualCard from "./WhiskeyIndividualCard";

export default class WhiskeyList extends Component {

    state = {
        whiskies: []
    }

    componentDidMount() {
        const newState = {}
        WhiskeyManager.getAll()
            .then(whiskies => (newState.whiskies = whiskies))
            .then(() => this.setState(newState))
    }

    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardHeader>Whiskey List</CardHeader>
                </Card>
                {this.state.whiskies.map(whiskey =>
                    <WhiskeyIndividualCard key={whiskey.id} whiskey={whiskey} />
                )}

            </React.Fragment>
        )
    }
}