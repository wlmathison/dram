// Building a search form for with search option buttons to be added to ReviewList

import React, { Component } from "react"
import { CardBody, Form, Button, CardTitle } from "reactstrap"

export default class ReviewSearchForm extends Component {
    render() {
        return (
            <React.Fragment>
                <CardTitle>Search for reviews by: </CardTitle>
                <CardBody>
                    <Form>
                        <Button
                            type="radio"
                            onClick={this.props.handleSearchTastingsByDate}
                        >Whiskey</Button> {" "}
                        <Button
                            type="radio"
                            onClick={this.props.handleSearchTastingsByTheme}
                        >User</Button> {" "}
                        <Button
                            type="radio"
                            onClick={this.props.handleSearchTastingsByWhiskey}
                        >Tasting</Button> {" "}
                        <Button
                            type="radio"
                            onClick={this.props.handleSearchAllReviews}
                        >All Reviews</Button>
                    </Form>
                </CardBody>
            </React.Fragment>
        )
    }
}