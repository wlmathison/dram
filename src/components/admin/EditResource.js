// Page builds the edit existing resource section for admin page

import React, { Component } from "react"
import { Card, CardBody, Form, Button, CardHeader } from "reactstrap"

export default class EditResource extends Component {
    render() {
        return (
            <React.Fragment>
                <Card
                    className="card-first">
                    <CardHeader>Edit / Delete Existing</CardHeader>
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
                                            onClick={this.props.handleEditDeleteCategory}
                                        >Category</Button>
                                        <Button
                                            className="search-buttons"
                                            color="info"
                                            type="radio"
                                            onClick={this.props.handleEditDeleteDistillery}
                                        >Distillery</Button>
                                        <Button
                                            className="search-buttons"
                                            color="info"
                                            type="radio"
                                            onClick={this.props.handleEditDeleteTasting}
                                        >Tasting</Button>
                                        <Button
                                            className="search-buttons"
                                            color="info"
                                            type="radio"
                                            onClick={this.props.handleEditDeleteTastingSelection}
                                        >Tasting Selection</Button>
                                        <Button
                                            className="search-buttons"
                                            color="info"
                                            type="radio"
                                            onClick={this.props.handleEditDeleteWhiskey}
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