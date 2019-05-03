// Page build an individual card to display a single review

import React, { Component } from "react"
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap"


export default class ReviewIndividualCard extends Component {

    render() {
        let id = this.props.review.tastingSelectionId - 1
        if (parseInt(sessionStorage.getItem("userId")) === this.props.review.user.id) {
            return (
                <React.Fragment>
                    <Card>
                        <CardBody>
                            <CardTitle>Whiskey: {this.props.tastingSelections[id].whiskey.name}</CardTitle>
                            <CardText>Reviewed by: {this.props.review.user.userName}</CardText>
                            <CardText>At Tasting: {this.props.tastingSelections[id].tasting.theme}</CardText>
                            <CardText>Date: {this.props.review.date}</CardText>
                            <CardText>Review: {this.props.review.review}</CardText>
                            <Button
                                id={`edit-${this.props.review.id}`}
                                onClick={this.props.handleEdit}
                            >Edit</Button> {" "}
                            <Button
                                id={`delete-${this.props.review.id}`}
                                color="danger"
                                onClick={this.props.handleDelete}
                            >Delete</Button>
                        </CardBody>
                    </Card>
                </React.Fragment>
            )
        } else {
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
}