// Building a search form for tastings resource by whiskey to be added to TastingList

import React, { Component } from "react"
import { CardBody, Dropdown, DropdownMenu, DropdownToggle, DropdownItem, CardTitle, Button } from "reactstrap"

export default class SearchByWhiskeyForm extends Component {

    state = {
        dropdownOpen: false
    }

    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }))
    }

    render() {
        return (
            <React.Fragment>
                <CardTitle>Search by Whiskey</CardTitle>
                <CardBody>
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>
                            Whiskies
                                </DropdownToggle>
                        <DropdownMenu>
                            {this.props.tastingSelections.map(tastingSelection => {
                                return <DropdownItem key={tastingSelection.id} onClick={() => this.props.handleSearchByWhiskey(tastingSelection.whiskeyId)}>{tastingSelection.whiskey.name}</DropdownItem>
                            })}
                        </DropdownMenu>
                    </Dropdown> {" "}
                    <Button
                        onClick={this.props.handleCancel}
                    >Cancel</Button>
                </CardBody>
            </React.Fragment>
        )
    }
}