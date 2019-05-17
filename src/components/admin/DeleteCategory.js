// Page builds the delete category form for admin page

import React, { Component } from "react"
import { Card, CardBody, Form, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, CardHeader } from "reactstrap"
import CategoryManager from "./../../modules/CategoryManager"

export default class DeleteCategory extends Component {

    state = {
        categoryId: 0,
        categoryName: "Select a category to delete",
        dropdownOpen: false
    }

    // Function to toggle state of dropdown
    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }))
    }

    // Function to post new category to database and call handleRefresh to refresh admin page
    handleDeleteCategory = event => {
        event.preventDefault()
        if (window.confirm(`Are you sure you want to delete ${this.state.categoryName}?`)) {
            CategoryManager.delete(parseInt(this.state.categoryId))
            this.props.handleRefresh()
        }
    }

    render() {
        return (
            <Card
                className="card-search">
                <CardHeader>Delete Category</CardHeader>
                <CardBody>
                    <Card
                        className="card-extra-opacity">
                        <CardBody>
                            <Form
                                className="search-form-buttons">
                                <Dropdown
                                    isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                    <DropdownToggle
                                        color="info"
                                        className="search-buttons"
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
                                <div
                                    className="search-form-buttons"
                                >
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
                            </Form>
                        </CardBody>
                    </Card>
                </CardBody>
                <CardHeader></CardHeader>
            </Card>
        )
    }
}