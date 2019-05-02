// Page build card for upcoming tasting to display on home page

import React, { Component } from "react"
import TastingManager from "../../modules/TastingManager"
import { Card, CardBody, CardHeader, CardText } from "reactstrap"

export default class UpcomingTastingCard extends Component {

    state = {
        upcomingTastings: [],
        isUpcoming: false
    }

    componentDidMount() {
        const newState = {}
        TastingManager.getAll()
            .then(tastings => {
                (newState.upcomingTastings = tastings.filter(tasting => tasting.isComplete === false))
            }).then(() => this.setState(newState))
    }

    render() {
        if (this.state.upcomingTastings.length > 0) {
            return (
                <React.Fragment>
                    <Card>
                        <CardHeader>Next Scheduled Tasting</CardHeader>
                        <CardBody>
                            {this.state.upcomingTastings.map(tasting =>
                                <React.Fragment key={tasting.id}>
                                    <CardText>Date: {tasting.date}</CardText>
                                    <CardText>Time: {tasting.time}</CardText>
                                    <CardText>Address: {tasting.address}</CardText>
                                    <hr></hr>
                                </React.Fragment>
                            )}
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
                            <CardText>No future tastings scheduled at this time</CardText>
                        </CardBody>
                    </Card>
                </React.Fragment>
            )
        }
    }
}