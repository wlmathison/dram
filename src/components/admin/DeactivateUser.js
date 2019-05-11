// Page builds the deactivate user form for admin page

import React, { Component } from "react"
import { Card, CardBody, Form, Button, CardHeader } from "reactstrap"

export default class DeactivateUser extends Component {
    render() {
        return (
            <React.Fragment>
                <Card
                    className="card-first">
                    <CardHeader>Deactivate User</CardHeader>
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
                                            color="success"
                                            type="radio"
                                            onClick={this.props.handleSearchWhiskiesByName}
                                        >Select Inactive User</Button>
                                        <Button
                                            className="search-buttons"
                                            type="radio"
                                            onClick={this.props.handleCancel}
                                        >Cancel</Button>
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