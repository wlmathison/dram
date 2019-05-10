// Page builds the activate/deactivate user section for admin page

import React, { Component } from "react"
import { Card, CardBody, Form, Button, CardHeader } from "reactstrap"

export default class ActivateDeactivateUser extends Component {
    render() {
        return (
            <React.Fragment>
                <Card
                    className="card-first">
                    <CardHeader>Activate/Deactivate User</CardHeader>
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
                                            onClick={this.props.handleSearchWhiskiesByName}
                                        >Activate Inactive User</Button>
                                        <Button
                                            className="search-buttons"
                                            color="info"
                                            type="radio"
                                            onClick={this.props.handleSearchWhiskiesByCategory}
                                        >Deactivate User</Button>
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