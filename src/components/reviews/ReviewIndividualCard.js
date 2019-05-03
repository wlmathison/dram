// Page build an individual card to display a single review

import React, { Component } from "react"
import { Card, CardBody, CardTitle, CardText } from "reactstrap"


export default class ReviewIndividualCard extends Component {

    render() {
        let id = this.props.review.tastingSelectionId - 1
        
        return (
            <React.Fragment>
                <Card>
                    <CardBody>
                        <CardTitle>Whiskey: {this.props.tastingSelections[id].whiskey.name}</CardTitle>
                        <CardText>Reviewed by: {this.props.review.user.userName}</CardText>
                        <CardText>At Tasting: {this.props.tastingSelections[id].tasting.theme}</CardText>
                        <CardText>Date: {this.props.review.date}</CardText>
                        <CardText>Review: {this.props.review.review}</CardText>
                    </CardBody>
                </Card>
            </React.Fragment>
        )
    }
}