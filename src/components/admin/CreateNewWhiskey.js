// Page builds the create new whiskey form for admin page

import React, { Component } from "react"
import { Card, CardBody, Form, Button, FormGroup, Label, Input, CardHeader, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import WhiskeyManager from "./../../modules/WhiskeyManager"

export default class CreateNewWhiskey extends Component {

    state = {
        categoryDropdown: false,
        distilleryDropdown: false,
        name: "",
        size: "",
        price: "",
        proof: "",
        age: "",
        categoryId: 0,
        categoryName: "Select a category",
        distilleryId: 0,
        distilleryName: "Select a distillery",
    }

    // Function to change state when input field changes
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
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

    // Function to post new category to database and call handleRefresh to refresh admin page
    handlePostNewWhiskey = event => {
        WhiskeyManager.post({
            name: this.state.name,
            size: this.state.size,
            price: this.state.price,
            proof: this.state.proof,
            age: this.state.age,
            categoryId: this.state.categoryId,
            distilleryId: this.state.distilleryId
        })
        this.props.handleRefresh()
    }

    render() {
        let categoryToggleColor = "info"
        if (this.state.categoryName === "Select a category") {
            categoryToggleColor = "secondary"
        }
        let distilleryToggleColor = "info"
        if (this.state.distilleryName === "Select a distillery") {
            distilleryToggleColor = "secondary"
        }
        return (
            <Card
                className="card-search">
                <CardHeader>Create New Whiskey</CardHeader>
                <CardBody>
                    <Card
                        className="card-extra-opacity">
                        <CardBody>
                            <Form>
                                <FormGroup>
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        required
                                        type="text"
                                        id="name"
                                        onChange={this.handleFieldChange}
                                        placeholder="Whiskey name"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="size">Size</Label>
                                    <Input
                                        required
                                        type="text"
                                        id="size"
                                        onChange={this.handleFieldChange}
                                        placeholder="Size of bottle"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="price">Price</Label>
                                    <Input
                                        required
                                        type="text"
                                        id="price"
                                        onChange={this.handleFieldChange}
                                        placeholder="Price of whiskey"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="proof">Proof</Label>
                                    <Input
                                        required
                                        type="text"
                                        id="proof"
                                        onChange={this.handleFieldChange}
                                        placeholder="Proof of whiskey"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="age">Age</Label>
                                    <Input
                                        required
                                        type="text"
                                        id="age"
                                        onChange={this.handleFieldChange}
                                        placeholder="Age of whiskey"
                                    />
                                </FormGroup>
                                <div
                                    className="search-form-buttons"
                                >
                                    <Dropdown
                                        isOpen={this.state.categoryDropdown} toggle={this.categoryToggle}>
                                        <DropdownToggle
                                            color={categoryToggleColor}
                                            className="search-buttons long-toggles"
                                            caret>
                                            {this.state.categoryName}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {this.props.categories.map(category =>
                                                <DropdownItem
                                                    key={category.id}
                                                    id={category.id}
                                                    onClick={() => this.setState({
                                                        categoryId: category.id,
                                                        categoryName: category.name
                                                    })
                                                    }>{category.name}</DropdownItem>
                                            )}
                                        </DropdownMenu>
                                    </Dropdown>
                                    <Dropdown
                                        isOpen={this.state.distilleryDropdown} toggle={this.distilleryToggle}>
                                        <DropdownToggle
                                            color={distilleryToggleColor}
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
                                                        distilleryName: distillery.name
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
                                        onClick={this.handlePostNewWhiskey}
                                    >
                                        Save Whiskey
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