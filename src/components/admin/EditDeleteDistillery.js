// Page builds the edit/delete distilery form for admin page

import React, { Component } from "react"
import { Card, CardBody, Form, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, CardHeader, FormGroup, Label, Input } from "reactstrap"
import DistilleryManager from "./../../modules/DistilleryManager"

export default class EditDeleteDistillery extends Component {

    state = {
        distilleryId: 0,
        distilleryName: "Select a distillery",
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

    // Function to put edited distillery to database and call handleRefresh to refresh admin page
    handlePutEditedDistillery = event => {
        if (this.state.name !== "" && this.state.region !== "") {
            DistilleryManager.put(this.state.distilleryId, {
                name: this.state.name,
                region: this.state.region
            })
            this.props.handleRefresh()
        } else {
            window.alert("Please enter both name and region")
        }
    }

    // Function to handle user clicking edit button, change state of deleteButton to false, and display edit form
    handleEditDistillery = event => {
        event.preventDefault()
        this.setState({
            editDeleteButtons: false,
            editForm: true
        })
    }

    // Function to delete distillery from database and call handleRefresh to refresh admin page
    handleDeleteDistillery = event => {
        event.preventDefault()
        if (window.confirm(`Are you sure you want to delete ${this.state.distilleryName}?`)) {
            DistilleryManager.delete(parseInt(this.state.distilleryId))
            this.props.handleRefresh()
        }
    }

    render() {
        let toggleColor = "info"
        if (this.state.distilleryName === "Select a distillery") {
            toggleColor = "secondary"
        }

        return (
            <Card
                className="card-search">
                <CardHeader>Edit/Delete Distillery</CardHeader>
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
                                            {this.state.distilleryName}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {this.props.distilleries.map(distillery =>
                                                <DropdownItem
                                                    key={distillery.id}
                                                    id={distillery.id}
                                                    onClick={() => this.setState({
                                                        distilleryId: distillery.id,
                                                        distilleryName: distillery.name,
                                                        name: distillery.name,
                                                        region: distillery.region
                                                    })
                                                    }>{distillery.name}</DropdownItem>
                                            )}
                                        </DropdownMenu>
                                    </Dropdown>
                                    {/*If dropdown distillery has not been clicked, edit and delete buttons are disabled  */}
                                    {this.state.distilleryId === 0 &&
                                        <div
                                            className="search-form-buttons"
                                        >
                                            <Button
                                                disabled
                                                className="search-buttons"
                                                color="info"
                                                onClick={this.handleEditDistillery}
                                            >
                                                Edit Distillery
                                         </Button>
                                            <Button
                                                disabled
                                                className="search-buttons"
                                                color="danger"
                                                onClick={this.handleDeleteDistillery}
                                            >
                                                Delete Distillery
                                        </Button>
                                            <Button
                                                className="search-buttons"
                                                onClick={this.props.handleCancel}
                                            >Cancel</Button>
                                        </div>
                                    }
                                    {this.state.distilleryId !== 0 &&
                                        <div
                                            className="search-form-buttons"
                                        >
                                            <Button
                                                className="search-buttons"
                                                color="info"
                                                onClick={this.handleEditDistillery}
                                            >
                                                Edit Distillery
                                         </Button>
                                            <Button
                                                className="search-buttons"
                                                color="danger"
                                                onClick={this.handleDeleteDistillery}
                                            >
                                                Delete Distillery
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
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        required
                                        type="text"
                                        id="name"
                                        onChange={this.handleFieldChange}
                                        value={this.state.name}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="region">Region</Label>
                                    <Input
                                        required
                                        type="text"
                                        id="region"
                                        onChange={this.handleFieldChange}
                                        value={this.state.region}
                                    />
                                </FormGroup>
                                <div
                                    className="search-form-buttons"
                                >
                                    <Button
                                        className="search-buttons"
                                        color="success"
                                        onClick={this.handlePutEditedDistillery}
                                    >
                                        Save Edited Distillery
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