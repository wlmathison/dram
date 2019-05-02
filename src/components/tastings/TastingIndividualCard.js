// Page build an individual card to display a single tasting

import React, { Component } from "react"
import { Card, CardBody, CardTitle, CardText } from "reactstrap"


export default class TastingIndividualCard extends Component {

    render() {
        if (this.props.tasting.isComplete) {
            return (
                <React.Fragment>
                    <Card>
                        <CardBody>
                            <CardTitle>Tasting #{this.props.tasting.id}</CardTitle>
                            <CardText>Date: {this.props.tasting.date}</CardText>
                            <CardText>Theme: {this.props.tasting.theme}</CardText>
                            <CardText>Whiskies:</CardText>
                            {this.props.tastingSelections.map(tastingSelection => {
                                if (tastingSelection.tastingId === this.props.tasting.id) {
                                    return <CardText key={tastingSelection.id}> - {tastingSelection.whiskey.name} </CardText>
                                } else {
                                    return null
                                }
                            })}
                            <CardText>Attendees: </CardText>
                            {this.props.tastingAttendance.map(tastingAttendance => {
                                if (tastingAttendance.tastingId === this.props.tasting.id) {
                                    return <CardText key={tastingAttendance.id}> - {tastingAttendance.user.userName} </CardText>
                                } else {
                                    return null
                                }
                            })}
                        </CardBody>
                    </Card>
                </React.Fragment>
            )
        } else {
            return null
        }
    }
}