// Building an edit form for user to edit existing review

import React, { Component } from "react"
import { Card, CardBody, CardText, Input, Button, CardTitle, CardHeader } from "reactstrap"

export default class ReviewEditForm extends Component {
    render() {
        let id = this.props.review.tastingSelectionId - 1
        return (
            <React.Fragment>
                <Card
                    className="card-first">
                    <CardBody>
                        <Card
                            className="card-extra-opacity">
                            <CardBody>
                                <CardTitle>Whiskey: {this.props.tastingSelections[id].whiskey.name}</CardTitle>
                                <CardText>Reviewed by: {this.props.review.user.userName}</CardText>
                                <CardText>At Tasting: {this.props.tastingSelections[id].tasting.theme}</CardText>
                                <CardText>Date: {this.props.review.date}</CardText>
                                <CardText>Review:
                                <Input
                                        id="editedReview"
                                        type="text"
                                        value={this.props.editedReview}
                                        onChange={this.props.handleFieldChange} />
                                </CardText>
                                <Button
                                color="success"
                                    id={this.props.review.id}
                                    onClick={this.props.handleSaveEdit}
                                >Save Review</Button> {" "}
                                <Button
                                    onClick={this.props.handleCancel}
                                >Cancel</Button>
                            </CardBody>
                        </Card>
                    </CardBody>
                    <CardHeader></CardHeader>
                </Card>
            </React.Fragment>
        )
    }
}