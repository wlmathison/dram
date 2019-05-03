// Building a search form for reviews resource by whiskey to be added to ReviewList

import React, { Component } from "react"
import { CardBody, Dropdown, DropdownMenu, DropdownToggle, DropdownItem, CardTitle, Button } from "reactstrap"
import WhiskeyManager from "../../modules/WhiskeyManager"

export default class SearchReviewsByWhiskeyForm extends Component {

    state = {
        dropdownOpen: false,
        whiskies: []
    }

    componentDidMount() {
        const newState = {}
        WhiskeyManager.getAll()
            .then(whiskies => (newState.whiskies = whiskies))
            .then(() => this.setState(newState))
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
                            {this.state.whiskies.map(whiskey => {
                                return <DropdownItem key={whiskey.id} onClick={() => this.props.handleSearchByWhiskey(whiskey.id)}>{whiskey.name}</DropdownItem>
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