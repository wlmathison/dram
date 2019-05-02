// Page build an individual card to display a single tasting

import React, { Component } from "react"
import { Card, CardBody, CardTitle, CardText } from "reactstrap"
import TastingSelectionManager from "./../../modules/TastingSelectionManager"
import tastingAttendanceManager from "./../../modules/TastingAttendanceManager"
import TastingAttendanceManager from "./../../modules/TastingAttendanceManager";

export default class TastingIndividualCard extends Component {

    state = {
        tastingSelections: [],
        tastingAttendance: []
    }

    componentDidMount() {
        const newState = {}
        TastingSelectionManager.getAll()
            .then(tastingSelections => (newState.tastingSelections = tastingSelections))
            .then(() => TastingAttendanceManager.getAll())
            .then(tastingAttendance => (newState.tastingAttendance = tastingAttendance))
            .then(() => this.setState(newState))
    }

    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardBody>
                        <CardTitle>Tasting #{this.props.tasting.id}</CardTitle>
                        <CardText>Date: {this.props.tasting.date}</CardText>
                        <CardText>Theme: {this.props.tasting.theme}</CardText>
                        <CardText>Whiskies:</CardText>
                        {this.state.tastingSelections.map(tastingSelection => {
                            if (tastingSelection.tastingId === this.props.tasting.id) {
                                return <CardText> - {tastingSelection.whiskey.name} </CardText>
                            }
                        })}
                        <CardText>Attendees: </CardText>
                        {this.state.tastingAttendance.map(tastingAttendance => {
                            if (tastingAttendance.tastingId === this.props.tasting.id) {
                                return <CardText> - {tastingAttendance.user.userName} </CardText>
                            }
                        })}
                    </CardBody>
                </Card>
            </React.Fragment>
        )
    }
}