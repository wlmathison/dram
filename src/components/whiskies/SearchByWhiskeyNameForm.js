// Building a search form for whiskies resource by category to be added to WhiskeyList

import React, { Component } from "react"
import { Card, CardHeader, CardBody, CardTitle, Form, FormGroup, Label, Input, Button } from "reactstrap"

export default class SearchByWhiskeyNameForm extends Component {

    state = {
        name: ""
    }

    // Function to change state of editUser when button clicked
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

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
                                tag={"h5"}>Search by Name</CardTitle>
                            <CardBody>
                                <Form>
                                    <FormGroup>
                                        <Label>Name:</Label>
                                        <Input
                                            required
                                            type="text"
                                            id="name"
                                            placeholder="Whiskey Name"
                                            onChange={this.handleFieldChange}
                                        />
                                    </FormGroup>
                                    <Button
                                        color="success"
                                        id={this.state.name}
                                        onClick={this.props.handleSearchByName}
                                    >Search</Button> {" "}
                                    <Button
                                        onClick={this.props.handleCancel}
                                    >Cancel</Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </CardBody>
                    <CardHeader></CardHeader>
                </Card>
            </React.Fragment>
        )
    }
}