// Page build card for upcoming tasting to display on home page

import React, { Component } from "react"
import TastingManager from "../../modules/TastingManager"
import { Card, CardBody, CardHeader, CardText } from "reactstrap"

export default class UpcomingTastingCard extends Component {

    state = {
        tasting: {}
    }

    componentDidMount() {
        const newState = {}
        TastingManager.getAll()
            .then(tastings => {
                (newState.tasting = tastings.find(tasting => tasting.isComplete === false))
            }).then(() => this.setState(newState))
    }

    render() {
        if (this.state.tasting !== {}) {
            return (
                <React.Fragment>
                    <Card>
                        <CardHeader>Next Scheduled Tasting</CardHeader>
                        <CardBody>
                            <CardText>Date: {this.state.tasting.date}</CardText>
                            <CardText>Time: {this.state.tasting.time}</CardText>
                            <CardText>Address: {this.state.tasting.address}</CardText>
                        </CardBody>
                    </Card>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <Card>
                        <CardHeader>Next Scheduled Tasting</CardHeader>
                        <CardBody>
                            <CardText>No Tasting Scheduled</CardText>
                        </CardBody>
                    </Card>
                </React.Fragment>
            )
        }
    }
}