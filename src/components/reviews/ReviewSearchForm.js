// Building a search form for with search option buttons to be added to ReviewList

import React, { Component } from "react"
import { Card, CardHeader, CardBody, Form, Button, CardTitle } from "reactstrap"

export default class ReviewSearchForm extends Component {
    render() {
        return (
            <React.Fragment>
                <Card
                    className="card-search">
                    <CardBody>
                        <Card
                            className="card-extra-opacity">
                            <CardTitle
                                className="search-form-title"
                                tag={"h5"}>Search for reviews by: </CardTitle>
                            <CardBody>
                                <Form
                                    className="search-form-buttons">                                    <Button
                                        className="search-buttons"
                                        color="info"
                                        type="radio"
                                        onClick={this.props.handleSearchReviewsByWhiskey}
                                    >Whiskey</Button> {" "}
                                    <Button
                                        className="search-buttons"
                                        color="info"
                                        type="radio"
                                        onClick={this.props.handleSearchReviewsByUser}
                                    >User</Button> {" "}
                                    <Button
                                        className="search-buttons"
                                        color="info"
                                        type="radio"
                                        onClick={this.props.handleSearchReviewsByTasting}
                                    >Tasting</Button> {" "}
                                    <Button
                                        className="search-buttons"
                                        color="info"
                                        type="radio"
                                        onClick={this.props.handleSearchAllReviews}
                                    >All Reviews</Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </CardBody>
                    <CardHeader></CardHeader>
                </Card>
            </React.Fragment >
        )
    }
}