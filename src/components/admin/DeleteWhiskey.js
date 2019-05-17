// Page builds the delete category form for admin page

import React, { Component } from "react"
import { Card, CardBody, Form, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, CardHeader } from "reactstrap"
import WhiskeyManager from "./../../modules/WhiskeyManager"

export default class DeleteWhiskey extends Component {

    state = {
        whiskeyId: 0,
        whiskeyName: "Select a whiskey to delete",
        dropdownOpen: false
    }

    // Function to toggle state of dropdown
    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }))
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
        if (this.state.whiskeyName === "Select a whiskey to delete") {
            toggleColor = "secondary"
        }
        return (
            <Card
                className="card-search">
                <CardHeader>Delete Whiskey</CardHeader>
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
                                                    whiskeyName: whiskey.name
                                                })
                                                }>{whiskey.name}</DropdownItem>
                                        )}
                                    </DropdownMenu>
                                </Dropdown>
                                <div
                                    className="search-form-buttons"
                                >
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
                            </Form>
                        </CardBody>
                    </Card>
                </CardBody>
                <CardHeader></CardHeader>
            </Card>
        )
    }
}