// Page builds the delete category form for admin page

import React, { Component } from "react"
import { Card, CardBody, Form, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, CardHeader, FormGroup, Label, Input } from "reactstrap"
import CategoryManager from "./../../modules/CategoryManager"

export default class DeleteCategory extends Component {

    state = {
        categoryId: 0,
        categoryName: "Select a category",
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

    // Function to post new category to database and call handleRefresh to refresh admin page
    handlePutNewCategory = event => {
        if (this.state.name !== "" && this.state.requirements !== "") {
            CategoryManager.put(this.state.categoryId, {
                name: this.state.name,
                requirements: this.state.requirements
            })
            this.props.handleRefresh()
        } else {
            window.alert("Please enter both name and requirements")
        }
    }

    // Function to handle user clicking edit button, change state of deleteButton to false, and display edit form
    handleEditCategory = event => {
        event.preventDefault()
        this.setState({
            editDeleteButtons: false,
            editForm: true
        })
    }

    // Function to delete category from database and call handleRefresh to refresh admin page
    handleDeleteCategory = event => {
        event.preventDefault()
        if (window.confirm(`Are you sure you want to delete ${this.state.categoryName}?`)) {
            CategoryManager.delete(parseInt(this.state.categoryId))
            this.props.handleRefresh()
        }
    }

    render() {
        let toggleColor = "info"
        if (this.state.categoryName === "Select a category") {
            toggleColor = "secondary"
        }
        return (
            <Card
                className="card-search">
                <CardHeader>Edit/Delete Category</CardHeader>
                <CardBody>
                    <Card
                        className="card-extra-opacity">
                        <CardBody>
                            {this.state.editDeleteButtons && <Form
                                className="search-form-buttons">
                                <Dropdown
                                    isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                    <DropdownToggle
                                        color={toggleColor}
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
                                                    categoryName: category.name,
                                                    name: category.name,
                                                    requirements: category.requirements
                                                })
                                                }>{category.name}</DropdownItem>
                                        )}
                                    </DropdownMenu>
                                </Dropdown>
                                {/*If dropdown category has not been clicked, edit and delete buttons are disabled  */}
                                {this.state.categoryId === 0 &&
                                    <div
                                        className="search-form-buttons"
                                    >
                                        <Button
                                            disabled
                                            className="search-buttons"
                                            color="info"
                                            onClick={this.handleEditCategory}
                                        >
                                            Edit Category
                                         </Button>
                                        <Button
                                            disabled
                                            className="search-buttons"
                                            color="danger"
                                            onClick={this.handleDeleteCategory}
                                        >
                                            Delete Category
                                        </Button>
                                        <Button
                                            className="search-buttons"
                                            onClick={this.props.handleCancel}
                                        >Cancel</Button>
                                    </div>
                                }
                                {this.state.categoryId !== 0 &&
                                    <div
                                        className="search-form-buttons"
                                    >
                                        <Button
                                            className="search-buttons"
                                            color="info"
                                            onClick={this.handleEditCategory}
                                        >
                                            Edit Category
                                         </Button>
                                        <Button
                                            className="search-buttons"
                                            color="danger"
                                            onClick={this.handleDeleteCategory}
                                        >
                                            Delete Category
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
                                    <Label htmlFor="requirements">Requirements</Label>
                                    <Input
                                        required
                                        type="textarea"
                                        id="requirements"
                                        onChange={this.handleFieldChange}
                                        value={this.state.requirements}
                                    />
                                </FormGroup>
                                <div
                                    className="search-form-buttons"
                                >
                                    <Button
                                        className="search-buttons"
                                        color="success"
                                        onClick={this.handlePutNewCategory}
                                    >
                                        Save Category
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