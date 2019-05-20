// Page builds the create new tasting form for admin page

import React, { Component } from "react"
import { Card, CardBody, Form, Button, FormGroup, Label, Input, CardHeader, ButtonGroup } from "reactstrap"
import TastingManager from "./../../modules/TastingManager"

export default class CreateNewCategory extends Component {

    state = {
        theme: "",
        date: "",
        time: "",
        address: "",
        active: false,
        isComplete: false
    }

    // Function to change state when input field changes
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    // Function to post new category to database and call handleRefresh to refresh admin page
    handlePostNewTasting = event => {
        TastingManager.post({
            theme: this.state.theme,
            date: this.state.date,
            time: this.state.time,
            address: this.state.address,
            active: this.state.active,
            isComplete: this.state.isComplete
        })
        this.props.handleRefresh()
    }

    // Function sets state of true/false when radio button selected
    onActiveRadioBtnClick(active) {
        this.setState({ active });
    }

    // Function sets state of true/false when radio button selected
    onCompleteRadioBtnClick(isComplete) {
        this.setState({ isComplete });
    }

    render() {
        return (
            <Card
                className="card-search">
                <CardHeader>Create New Tasting</CardHeader>
                <CardBody>
                    <Card
                        className="card-extra-opacity">
                        <CardBody>
                            <Form>
                                <FormGroup>
                                    <Label htmlFor="theme">Theme</Label>
                                    <Input
                                        required
                                        type="theme"
                                        id="theme"
                                        onChange={this.handleFieldChange}
                                        placeholder="Tasting theme"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="date">Date</Label>
                                    <Input
                                        required
                                        type="date"
                                        id="date"
                                        onChange={this.handleFieldChange}
                                        placeholder="mm/dd/yyyy"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="time">Time</Label>
                                    <Input
                                        required
                                        type="text"
                                        id="time"
                                        onChange={this.handleFieldChange}
                                        placeholder="Time of day for tasting"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="address">Address</Label>
                                    <Input
                                        required
                                        type="text"
                                        id="address"
                                        onChange={this.handleFieldChange}
                                        placeholder="Address where tasting is being held"
                                    />
                                </FormGroup>
                                <ButtonGroup
                                    className="radio-group">
                                    <Label>Is tasting active? </Label>
                                    <div>
                                        <Button
                                            onClick={() => this.onActiveRadioBtnClick(true)}
                                            active={this.state.active === true}
                                        >Yes</Button>
                                        <Button
                                            onClick={() => this.onActiveRadioBtnClick(false)}
                                            active={this.state.active === false}
                                        >No</Button>
                                    </div>
                                </ButtonGroup>
                                <ButtonGroup
                                    className="radio-group">
                                    <Label>Is tasting completed? </Label>
                                    <div>
                                        <Button
                                            onClick={() => this.onCompleteRadioBtnClick(true)}
                                            active={this.state.isComplete === true}
                                        >Yes</Button>
                                        <Button
                                            onClick={() => this.onCompleteRadioBtnClick(false)}
                                            active={this.state.isComplete === false}
                                        >No</Button>
                                    </div>
                                </ButtonGroup>
                                <div
                                    className="search-form-buttons save-button-div"
                                >
                                    <Button
                                        className="search-buttons"
                                        color="success"
                                        onClick={this.handlePostNewTasting}
                                    >
                                        Save Tasting
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