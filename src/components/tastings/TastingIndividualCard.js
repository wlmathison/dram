// Page build an individual card to display a single tasting

import React, { Component } from "react"
import { Card, CardBody, CardTitle, CardText } from "reactstrap"

export default class TastingIndividualCard extends Component {
    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardBody>
                        <CardTitle>Tasting #{this.props.tasting.id}</CardTitle>
                        <CardText>Date: {this.props.tasting.date}</CardText>
                        <CardText>Theme: {this.props.tasting.theme}</CardText>
                        <CardText>Whiskies: </CardText>
                        <CardText>Attendees: </CardText>
    
                    </CardBody>
                </Card>
            </React.Fragment>
        )
    }
}