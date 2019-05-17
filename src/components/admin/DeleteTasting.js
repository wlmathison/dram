// Page builds the delete tasting form for admin page

import React, { Component } from "react"
import { Card, CardBody, Form, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, CardHeader } from "reactstrap"
import TastingManager from "./../../modules/TastingManager"

export default class DeleteTasting extends Component {

    state = {
        tastingId: 0,
        tastingName: "Select a tasting to delete",
        dropdownOpen: false
    }

    // Function to toggle state of dropdown
    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }))
    }

    // Function to delete tasting from database and call handleRefresh to refresh admin page
    handleDeleteTasting = event => {
        event.preventDefault()
        if (window.confirm(`Are you sure you want to delete ${this.state.tastingName}?`)) {
            TastingManager.delete(parseInt(this.state.tastingId))
            this.props.handleRefresh()
        }
    }

    render() {
        let toggleColor = "info"
        if (this.state.tastingName === "Select a tasting to delete") {
            toggleColor = "secondary"
        }
        return (
            <Card
                className="card-search">
                <CardHeader>Delete Tasting</CardHeader>
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
                                        {this.state.tastingName}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {this.props.tastings.map(tasting =>
                                            <DropdownItem
                                                key={tasting.id}
                                                id={tasting.id}
                                                onClick={() => this.setState({
                                                    tastingId: tasting.id,
                                                    tastingName: tasting.theme
                                                })
                                                }>{tasting.theme}</DropdownItem>
                                        )}
                                    </DropdownMenu>
                                </Dropdown>
                                <div
                                    className="search-form-buttons"
                                >
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
                            </Form>
                        </CardBody>
                    </Card>
                </CardBody>
                <CardHeader></CardHeader>
            </Card>
        )
    }
}