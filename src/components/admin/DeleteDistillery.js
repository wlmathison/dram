// Page builds the delete category form for admin page

import React, { Component } from "react"
import { Card, CardBody, Form, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, CardHeader } from "reactstrap"
import DistilleryManager from "./../../modules/DistilleryManager"

export default class DeleteDistillery extends Component {

    state = {
        distilleryId: 0,
        distilleryName: "Select a distillery to delete",
        dropdownOpen: false
    }

    // Function to toggle state of dropdown
    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }))
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
        if (this.state.distilleryName === "Select a distillery to delete") {
            toggleColor = "secondary"
        }

        return (
            <Card
                className="card-search">
                <CardHeader>Delete Distillery</CardHeader>
                <CardBody>
                    <Card
                        className="card-extra-opacity">
                        <CardBody>
                            <Form
                                className="search-form-buttons">
                                <Dropdown
                                    isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                    <DropdownToggle
                                        color={toggleColor}
                                        className="search-buttons"
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
                                <div
                                    className="search-form-buttons"
                                >
                                    <Button
                                        className="search-buttons"
                                        color="danger"
                                        onClick={this.handleDeleteDistillery}
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