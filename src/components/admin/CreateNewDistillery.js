// Page builds the create new category form for admin page

import React, { Component } from "react"
import { Card, CardBody, Form, Button, FormGroup, Label, Input, CardHeader } from "reactstrap"
import DistilleryManager from "./../../modules/DistilleryManager"

export default class CreateNewCategory extends Component {

    state = {
        name: "",
        region: ""
    }

    // Function to change state when input field changes
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    // Function to post new category to database and call handleRefresh to refresh admin page
    handlePostNewCategory = event => {
        DistilleryManager.post({
            name: this.state.name,
            region: this.state.region
        })
        this.props.handleRefresh()
    }

    render() {
        return (
            <Card
                className="card-search">
                <CardHeader>Create New Distillery</CardHeader>
                <CardBody>
                    <Card
                        className="card-extra-opacity">
                        <CardBody>
                            <Form>
                                <FormGroup>
                                    <Label htmlFor="name">Distillery Name</Label>
                                    <Input
                                        required
                                        type="text"
                                        id="name"
                                        onChange={this.handleFieldChange}
                                        placeholder="Distillery name"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="region">Region</Label>
                                    <Input
                                        required
                                        type="text"
                                        id="region"
                                        onChange={this.handleFieldChange}
                                        placeholder="State or country of distillery"
                                    />
                                </FormGroup>
                                <div
                                    className="search-form-buttons  "
                                >
                                    <Button
                                        className="search-buttons"
                                        color="success"
                                        onClick={this.handlePostNewCategory}
                                    >
                                        Save Distillery
                                </Button>
                                    <Button
                                        className="search-buttons"
                                        onClick={this.props.handleCancel}
                                    >Cancel</Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </CardBody>
                <CardHeader></CardHeader>
            </Card>
        )
    }
}