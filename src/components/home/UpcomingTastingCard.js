// Page builds card for upcoming tasting to display on home page

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
        TastingManager.getExpand()
            .then(tastings => {
                (newState.upcomingTastings = tastings.filter(tasting => tasting.isComplete === false))
            }).then(() => this.setState(newState))
    }

    render() {
        if (this.state.upcomingTastings.length > 0) {
            return (
                <React.Fragment>
                    <Card
                        className="card-first">
                        <CardHeader>Upcoming Tastings</CardHeader>
                        <CardBody
                            className="hl-scroll-body">
                            {this.state.upcomingTastings.map(tasting => {
                                let dateArray = tasting.date.split('-')
                                dateArray.push(dateArray.shift())
                                let date = dateArray.join('/')
                                return <Card key={tasting.id}
                                    className="hl-scroll-card card-extra-opacity">
                                    <CardBody>
                                        <CardText>Date: {date}</CardText>
                                        <CardText>Time: {tasting.time}</CardText>
                                        <CardText>Address: {tasting.address}</CardText>
                                    </CardBody>
                                </Card>
                            }
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