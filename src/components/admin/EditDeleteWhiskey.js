// Page builds the edit/delete category form for admin page

import React, { Component } from "react"
import { Card, CardBody, Form, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, CardHeader, FormGroup, Label, Input } from "reactstrap"
import WhiskeyManager from "./../../modules/WhiskeyManager"

export default class EditDeleteWhiskey extends Component {

    state = {
        whiskeyId: 0,
        whiskeyName: "Select a whiskey",
        dropdownOpen: false,
        editDeleteButtons: true,
        editForm: false,
        categoryDropdown: false,
        distilleryDropdown: false,
        name: "",
        size: "",
        price: "",
        proof: "",
        age: ""
    }

    // Function to toggle state of dropdown
    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }))
    }

    // Function to toggle state of category dropdown
    categoryToggle = () => {
        this.setState(prevState => ({
            categoryDropdown: !prevState.categoryDropdown
        }))
    }

    // Function to toggle state of distillery dropdown
    distilleryToggle = () => {
        this.setState(prevState => ({
            distilleryDropdown: !prevState.distilleryDropdown
        }))
    }

    // Function to change state when input field changes
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    // Function to put edited whiskey to database and call handleRefresh to refresh admin page
    handlePutEditedWhiskey = event => {
        if (this.state.name !== "" && this.state.size !== "" && this.state.price !== "" && this.state.proof !== "" && this.state.age !== "" && this.state.categoryId !== 0 && this.state.distilleryId !== 0) {
            WhiskeyManager.put(this.state.whiskeyId, {
                name: this.state.name,
                size: this.state.size,
                price: this.state.price,
                proof: this.state.proof,
                age: this.state.age,
                categoryId: this.state.categoryId,
                distilleryId: this.state.distilleryId
            })
            this.props.handleRefresh()
        } else {
            window.alert("Please complete all fields")
        }
    }

    // Function to handle user clicking edit button, change state of deleteButton to false, and display edit form
    handleEditWhiskey = event => {
        event.preventDefault()
        this.setState({
            editDeleteButtons: false,
            editForm: true
        })
    }

    // Function to delete whiskey from database and call handleRefresh to refresh admin page
    handleDeleteWhiskey = event => {
        event.preventDefault()
        if (window.confirm(`Are you sure you want to delete ${this.state.whiskeyName}?`)) {
            WhiskeyManager.delete(parseInt(this.state.whiskeyId))
            this.props.handleRefresh()
        }
    }

    render() {
        let toggleColor = "info"
        if (this.state.whiskeyName === "Select a whiskey") {
            toggleColor = "secondary"
        }
        return (
            <Card
                className="card-search">
                <CardHeader>Edit/Delete Whiskey</CardHeader>
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
                                            {this.state.whiskeyName}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {this.props.whiskies.map(whiskey =>
                                                <DropdownItem
                                                    key={whiskey.id}
                                                    id={whiskey.id}
                                                    onClick={() => this.setState({
                                                        whiskeyId: whiskey.id,
                                                        whiskeyName: whiskey.name,
                                                        name: whiskey.name,
                                                        size: whiskey.size,
                                                        price: whiskey.price,
                                                        proof: whiskey.proof,
                                                        age: whiskey.age,
                                                        categoryId: whiskey.categoryId,
                                                        distilleryId: whiskey.distilleryId
                                                    })
                                                    }>{whiskey.name}</DropdownItem>
                                            )}
                                        </DropdownMenu>
                                    </Dropdown>
                                    {this.state.whiskeyId === 0 &&
                                        <div
                                            className="search-form-buttons"
                                        >
                                            <Button
                                                disabled
                                                className="search-buttons"
                                                color="info"
                                                onClick={this.handleEditWhiskey}
                                            >
                                                Edit Whiskey
                                         </Button>
                                            <Button
                                                disabled
                                                className="search-buttons"
                                                color="danger"
                                                onClick={this.handleDeleteWhiskey}
                                            >
                                                Delete Whiskey
                                </Button>
                                            <Button
                                                className="search-buttons"
                                                onClick={this.props.handleCancel}
                                            >Cancel</Button>
                                        </div>
                                    }
                                    {this.state.whiskeyId !== 0 &&
                                        <div
                                            className="search-form-buttons"
                                        >
                                            <Button
                                                className="search-buttons"
                                                color="info"
                                                onClick={this.handleEditWhiskey}
                                            >
                                                Edit Whiskey
                                         </Button>
                                            <Button
                                                className="search-buttons"
                                                color="danger"
                                                onClick={this.handleDeleteWhiskey}
                                            >
                                                Delete Whiskey
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
                                    <Label htmlFor="size">Size</Label>
                                    <Input
                                        required
                                        type="text"
                                        id="size"
                                        onChange={this.handleFieldChange}
                                        value={this.state.size}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="price">Price</Label>
                                    <Input
                                        required
                                        type="text"
                                        id="price"
                                        onChange={this.handleFieldChange}
                                        value={this.state.price}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="proof">Proof</Label>
                                    <Input
                                        required
                                        type="text"
                                        id="proof"
                                        onChange={this.handleFieldChange}
                                        value={this.state.proof}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="age">Age</Label>
                                    <Input
                                        required
                                        type="text"
                                        id="age"
                                        onChange={this.handleFieldChange}
                                        value={this.state.age}
                                    />
                                </FormGroup>
                                <div
                                    className="search-form-buttons"
                                >
                                    <Dropdown
                                        isOpen={this.state.categoryDropdown} toggle={this.categoryToggle}>
                                        <DropdownToggle
                                            color="info"
                                            className="search-buttons long-toggles"
                                            caret>
                                            {this.props.categories.find(category => category.id === this.state.categoryId).name}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {this.props.categories.map(category =>
                                                <DropdownItem
                                                    key={category.id}
                                                    id={category.id}
                                                    onClick={() => this.setState({
                                                        categoryId: category.id
                                                    })
                                                    }>{category.name}</DropdownItem>
                                            )}
                                        </DropdownMenu>
                                    </Dropdown>
                                    <Dropdown
                                        isOpen={this.state.distilleryDropdown} toggle={this.distilleryToggle}>
                                        <DropdownToggle
                                            color="info"
                                            className="search-buttons long-toggles"
                                            caret>
                                            {this.props.distilleries.find(distillery => distillery.id === this.state.distilleryId).name}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {this.props.distilleries.map(distillery =>
                                                <DropdownItem
                                                    key={distillery.id}
                                                    id={distillery.id}
                                                    onClick={() => this.setState({
                                                        distilleryId: distillery.id
                                                    })
                                                    }>{distillery.name}</DropdownItem>
                                            )}
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                                <div
                                    className="search-form-buttons"
                                >
                                    <Button
                                        className="search-buttons"
                                        color="success"
                                        onClick={this.handlePutEditedWhiskey}
                                    >
                                        Save Edited Whiskey
                                </Button>
                                    <Button
                                        className="search-buttons"
                                        onClick={this.props.handleCancel}
                                    >Cancel</Button>
                                </div>
                            </Form>
                            }
                        </CardBody>
                    </Card>
                </CardBody>
                <CardHeader></CardHeader>
            </Card>
        )
    }
}