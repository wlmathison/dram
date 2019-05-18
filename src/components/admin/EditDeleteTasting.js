// Page builds the edit/delete tasting form for admin page

import React, { Component } from "react"
import { Card, CardBody, Form, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, CardHeader, FormGroup, Label, Input, ButtonGroup } from "reactstrap"
import TastingManager from "./../../modules/TastingManager"

export default class EditDeleteTasting extends Component {

    state = {
        tastingId: 0,
        tastingName: "Select a tasting",
        dropdownOpen: false,
        editDeleteButtons: true,
        editForm: false
    }

    // Function to toggle state of dropdown
    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }))
    }

    // Function to change state when input field changes
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    // Function to put edited tasting to database and call handleRefresh to refresh admin page
    handlePutEditedTasting = event => {
        if (this.state.theme !== "" && this.state.date !== "" && this.state.time !== "" && this.state.address !== "") {
            TastingManager.put(this.state.tastingId, {
                theme: this.state.theme,
                date: this.state.date,
                time: this.state.time,
                address: this.state.address,
                active: this.state.active,
                isComplete: this.state.isComplete
            })
            this.props.handleRefresh()
        } else {
            window.alert("Please complete all fields")
        }
    }

    // Function to handle user clicking edit button, change state of deleteButton to false, and display edit form
    handleEditTasting = event => {
        event.preventDefault()
        this.setState({
            editDeleteButtons: false,
            editForm: true
        })
    }

    // Function to delete tasting from database and call handleRefresh to refresh admin page
    handleDeleteTasting = event => {
        event.preventDefault()
        if (window.confirm(`Are you sure you want to delete ${this.state.tastingName}?`)) {
            TastingManager.delete(parseInt(this.state.tastingId))
            this.props.handleRefresh()
        }
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
        let toggleColor = "info"
        if (this.state.tastingName === "Select a tasting") {
            toggleColor = "secondary"
        }
        return (
            <Card
                className="card-search">
                <CardHeader>Edit/Delete Tasting</CardHeader>
                <CardBody>
                    <Card
                        className="card-extra-opacity">
                        <CardBody>
                            {this.state.editDeleteButtons &&
                                <Form
                                    className="search-form-buttons">
                                    <Dropdown
                                        isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                        <DropdownToggle
                                            color={toggleColor}
                                            className="search-buttons long-toggles"
                                            caret>
                                            {this.state.tastingName}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {this.props.tastings.map(tasting =>
                                                <DropdownItem
                                                    key={tasting.id}
                                                    id={tasting.id}
                                                    onClick={() => this.setState({
                                                        tastingId: tasting.id,
                                                        tastingName: tasting.theme,
                                                        theme: tasting.theme,
                                                        date: tasting.date,
                                                        time: tasting.time,
                                                        address: tasting.address,
                                                        active: tasting.active,
                                                        isComplete: tasting.isComplete
                                                    })
                                                    }>{tasting.theme}</DropdownItem>
                                            )}
                                        </DropdownMenu>
                                    </Dropdown>
                                    {/*If dropdown tasting has not been clicked, edit and delete buttons are disabled  */}
                                    {this.state.tastingId === 0 &&
                                        <div
                                            className="search-form-buttons"
                                        >
                                            <Button
                                                disabled
                                                className="search-buttons"
                                                color="info"
                                                onClick={this.handleEditTasting}
                                            >
                                                Edit Tasting
                                         </Button>
                                            <Button
                                                disabled
                                                className="search-buttons"
                                                color="danger"
                                                onClick={this.handleDeleteTasting}
                                            >
                                                Delete Tasting
                                        </Button>
                                            <Button
                                                className="search-buttons"
                                                onClick={this.props.handleCancel}
                                            >Cancel</Button>
                                        </div>
                                    }
                                    {this.state.tastingId !== 0 &&
                                        <div
                                            className="search-form-buttons"
                                        >
                                            <Button
                                                className="search-buttons"
                                                color="info"
                                                onClick={this.handleEditTasting}
                                            >
                                                Edit Tasting
                                         </Button>
                                            <Button
                                                className="search-buttons"
                                                color="danger"
                                                onClick={this.handleDeleteTasting}
                                            >
                                                Delete Tasting
                                        </Button>
                                            <Button
                                                className="search-buttons"
                                                onClick={this.props.handleCancel}
                                            >Cancel</Button>
                                        </div>
                                    }
                                </Form>
                            }
                            {this.state.editForm && <Form>
                                <FormGroup>
                                    <Label htmlFor="theme">Theme</Label>
                                    <Input
                                        required
                                        type="text"
                                        id="theme"
                                        onChange={this.handleFieldChange}
                                        value={this.state.theme}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="date">Date</Label>
                                    <Input
                                        required
                                        type="date"
                                        id="date"
                                        onChange={this.handleFieldChange}
                                        value={this.state.date}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="time">Time</Label>
                                    <Input
                                        required
                                        type="text"
                                        id="time"
                                        onChange={this.handleFieldChange}
                                        value={this.state.time}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="address">Address</Label>
                                    <Input
                                        required
                                        type="text"
                                        id="address"
                                        onChange={this.handleFieldChange}
                                        value={this.state.address}
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
                                    className="search-form-buttons"
                                >
                                    <Button
                                        className="search-buttons"
                                        color="success"
                                        onClick={this.handlePutEditedTasting}
                                    >
                                        Save Tasting
                                </Button>
                                    <Button
                                        className="search-buttons"
                                        onClick={this.props.handleCancel}
                                    >Cancel</Button>
                                </div>
                            </Form>}
                        </CardBody>
                    </Card>
                </CardBody>
                <CardHeader></CardHeader>
            </Card>
        )
    }
}