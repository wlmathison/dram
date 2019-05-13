// Page builds the create new category form for admin page

import React, { Component } from "react"
import { Card, CardBody, Form, Button, FormGroup, Label, Input, CardHeader } from "reactstrap"
import CategoryManager from "./../../modules/CategoryManager"

export default class CreateNewCategory extends Component {

    state = {
        name: "",
        requirements: ""
    }

    // Function to change state when input field changes
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    // Function to post new category to database and call handleCancel to refresh admin page
    handlePostNewCategory = event => {
        CategoryManager.post({
            name: this.state.name,
            requirements: this.state.requirements
        })
        this.props.handleRefresh()
    }

    render() {
        return (
            <Card
                className="card-search">
                <CardHeader></CardHeader>
                <CardBody>
                    <Card
                        className="card-extra-opacity">
                        <CardBody>
                            <h3>Create New Category</h3>
                            <Form>
                                <FormGroup>
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        required
                                        type="text"
                                        id="name"
                                        onChange={this.handleFieldChange}
                                        placeholder="Whiskey category name"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="requirements">Requirements</Label>
                                    <Input
                                        required
                                        type="text"
                                        id="requirements"
                                        onChange={this.handleFieldChange}
                                        placeholder="Specific requirements for category"
                                    />
                                </FormGroup>
                                <div
                                    className="search-form-buttons"
                                >
                                    <Button
                                        className="search-buttons"
                                        color="success"
                                        onClick={this.handlePostNewCategory}
                                    >
                                        Register
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
            </Card>
        )
    }
}