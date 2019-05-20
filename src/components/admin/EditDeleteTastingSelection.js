// Page builds the delete tasting selection form for admin page

import React, { Component } from "react"
import { Card, CardBody, Form, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, CardHeader } from "reactstrap"
import TastingSelectionManager from "./../../modules/TastingSelectionManager"

export default class EditDeleteTastingSelection extends Component {

    state = {
        tastingSelectionId: 0,
        tastingSelectionName: "Select a tasting selection",
        dropdownOpen: false
    }

    // Function to toggle state of dropdown
    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }))
    }

    // Function to delete tastingSelection from database and call handleRefresh to refresh admin page
    handleDeleteTastingSelection = event => {
        event.preventDefault()
        if (window.confirm(`Are you sure you want to delete ${this.state.tastingSelectionName}?`)) {
            TastingSelectionManager.delete(parseInt(this.state.tastingSelectionId))
            this.props.handleRefresh()
        }
    }

    render() {
        let toggleColor = "info"
        if (this.state.tastingSelectionName === "Select a tasting selection") {
            toggleColor = "secondary"
        }
        return (
            <Card
                className="card-search">
                <CardHeader>Delete Tasting Selection</CardHeader>
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
                                        {this.state.tastingSelectionName}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {this.props.tastingSelections.map(tastingSelection => {
                                            let tasting = this.props.tastings.find(tasting => tasting.id === tastingSelection.tastingId).theme
                                            let whiskey = this.props.whiskies.find(whiskey => whiskey.id === tastingSelection.whiskeyId).name
                                            let tastingWhiskey = `${tasting}, ${whiskey}`
                                            return <DropdownItem
                                                key={tastingSelection.id}
                                                id={tastingSelection.id}
                                                onClick={() => this.setState({
                                                    tastingSelectionId: tastingSelection.id,
                                                    tastingSelectionName: tastingWhiskey
                                                })
                                                }>{tastingWhiskey}</DropdownItem>
                                        })}
                                    </DropdownMenu>
                                </Dropdown>
                                {/*If dropdown tastingSelection has not been clicked, edit and delete buttons are disabled  */}
                                {this.state.tastingSelectionId === 0 &&
                                    <div
                                        className="search-form-buttons"
                                    >
                                        <Button
                                            disabled
                                            className="search-buttons"
                                            color="danger"
                                            onClick={this.handleDeleteTastingSelection}
                                        >
                                            Delete Tasting Selection
                                        </Button>
                                        <Button
                                            className="search-buttons"
                                            onClick={this.props.handleCancel}
                                        >Cancel</Button>
                                    </div>
                                }
                                {this.state.tastingSelectionId !== 0 && <div
                                    className="search-form-buttons"
                                >
                                    <Button
                                        className="search-buttons"
                                        color="danger"
                                        onClick={this.handleDeleteTastingSelection}
                                    >
                                        Delete Tasting Selection
                                        </Button>
                                    <Button
                                        className="search-buttons"
                                        onClick={this.props.handleCancel}
                                    >Cancel</Button>
                                </div>
                                }
                            </Form>
                        </CardBody>
                    </Card>
                </CardBody>
                <CardHeader></CardHeader>
            </Card>
        )
    }
}