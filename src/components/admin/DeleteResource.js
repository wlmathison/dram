// Page builds the delete resource section for admin page

import React, { Component } from "react"
import { Card, CardBody, Form, Button, CardHeader } from "reactstrap"

export default class DeleteResource extends Component {
    render() {
        return (
            <React.Fragment>
                <Card
                    className="card-first">
                    <CardHeader>Delete</CardHeader>
                    <Card
                        className="card-search">
                        <CardBody>
                            <Card
                                className="card-extra-opacity">
                                <CardBody>
                                    <Form
                                        className="search-form-buttons">
                                        <Button
                                            className="search-buttons"
                                            color="info"
                                            type="radio"
                                            onClick={this.props.handleDeleteCategory}
                                        >Category</Button>
                                        <Button
                                            className="search-buttons"
                                            color="info"
                                            type="radio"
                                            onClick={this.props.handleDeleteDistillery}
                                        >Distillery</Button>
                                        <Button
                                            className="search-buttons"
                                            color="info"
                                            type="radio"
                                            onClick={this.props.handleDeleteTasting}
                                        >Tasting</Button>
                                        <Button
                                            className="search-buttons"
                                            color="info"
                                            type="radio"
                                            onClick={this.props.handleDeleteTastingSelection}
                                        >Tasting Selection</Button>
                                        <Button
                                            className="search-buttons"
                                            color="info"
                                            type="radio"
                                            onClick={this.props.handleDeleteWhiskey}
                                        >Whiskey</Button>
                                    </Form>
                                </CardBody>
                            </Card>
                        </CardBody>
                    </Card>
                </Card>
            </React.Fragment>
        )
    }
}