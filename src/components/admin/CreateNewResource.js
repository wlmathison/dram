// Page builds the create new resource section for admin page

import React, { Component } from "react"
import { Card, CardBody, Form, Button, CardHeader } from "reactstrap"

export default class CreateNewResource extends Component {
    render() {
        return (
            <React.Fragment>
                <Card
                    className="card-first">
                    <CardHeader>Create New</CardHeader>
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
                                            onClick={this.props.handleCreateCategory}
                                        >Category</Button>
                                        <Button
                                            className="search-buttons"
                                            color="info"
                                            type="radio"
                                            onClick={this.props.handleCreateDistillery}
                                        >Distillery</Button>
                                        <Button
                                            className="search-buttons"
                                            color="info"
                                            type="radio"
                                            onClick={this.props.handleCreateTasting}
                                        >Tasting</Button>
                                        <Button
                                            className="search-buttons"
                                            color="info"
                                            type="radio"
                                            onClick={this.props.handleCreateTastingSelection}
                                        >Tasting Selection</Button>
                                        <Button
                                            className="search-buttons"
                                            color="info"
                                            type="radio"
                                            onClick={this.props.handleCreateWhiskey}
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