// Page builds the create new tastingSelection form for admin page

import React, { Component } from "react"
import { Card, CardBody, Form, Button, CardHeader, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import TastingSelectionManager from "./../../modules/TastingSelectionManager"

export default class CreateNewTastingSelection extends Component {

    state = {
        tastingDropdown: false,
        whiskeyDropdown: false,
        tastingTheme: "Select a tasting",
        whiskeyName: "Select a whiskey",
        tastingId: 0,
        whiskeyId: 0
    }

    // Function to change state when dropdown field is selected
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    // Function to toggle state of tasting dropdown
    tastingToggle = () => {
        this.setState(prevState => ({
            tastingDropdown: !prevState.tastingDropdown
        }))
    }

    // Function to toggle state of whiskey dropdown
    whiskeyToggle = () => {
        this.setState(prevState => ({
            whiskeyDropdown: !prevState.whiskeyDropdown
        }))
    }

    // Function to handle user clikcing submit tasting setlection, post new tasting selection, and refresh admin page
    handleSubmitTastingSelection = event => {
        event.preventDefault()
        TastingSelectionManager.post({
            tastingId: this.state.tastingId,
            whiskeyId: this.state.whiskeyId,
            isWinner: false
        })
        this.props.handleRefresh()

    }

    render() {
        let tastingToggleColor = "info"
        if (this.state.tastingTheme === "Select a tasting") {
            tastingToggleColor = "secondary"
        }
        let whiskeyToggleColor = "info"
        if (this.state.whiskeyName === "Select a whiskey") {
            whiskeyToggleColor = "secondary"
        }
        return (
            <Card
                className="card-first">
                <CardHeader>Create New Tasting Selection</CardHeader>
                <Card
                    className="card-search">
                    <CardBody>
                        <Card
                            className="card-extra-opacity">
                            <CardBody>
                                <Form
                                    className="search-form-buttons">
                                    <Dropdown
                                        isOpen={this.state.tastingDropdown} toggle={this.tastingToggle}>
                                        <DropdownToggle
                                            color={tastingToggleColor}
                                            className="search-buttons"
                                            caret>
                                            {this.state.tastingTheme}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {this.props.tastings.some(tasting => tasting.isComplete === false) && this.props.tastings.map(tasting => {
                                                if (!tasting.isComplete) {
                                                    return <DropdownItem
                                                        key={tasting.id}
                                                        id={tasting.id}
                                                        onClick={() => this.setState({
                                                            tastingId: tasting.id,
                                                            tastingTheme: tasting.theme
                                                        })
                                                        }>{tasting.theme}</DropdownItem>
                                                } else {
                                                    return null
                                                }
                                            })}
                                            {!this.props.tastings.some(tasting => tasting.isComplete === false) && <DropdownItem
                                            >No Incomplete Tastings</DropdownItem>
                                            }
                                        </DropdownMenu>
                                    </Dropdown>
                                    <Dropdown
                                        isOpen={this.state.whiskeyDropdown} toggle={this.whiskeyToggle}>
                                        <DropdownToggle
                                            color={whiskeyToggleColor}
                                            className="search-buttons"
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
                                    <Button
                                        color="success"
                                        className="search-buttons"
                                        onClick={this.handleSubmitTastingSelection}
                                    >Submit Tasting Selection</Button>
                                    <Button
                                        className="search-buttons"
                                        onClick={this.props.handleCancel}
                                    >Cancel</Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </CardBody>
                    <CardHeader></CardHeader>
                </Card>
            </Card>
        )
    }
}