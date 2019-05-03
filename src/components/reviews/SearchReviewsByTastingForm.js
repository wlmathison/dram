// Building a search form for reviews resource by tasting to be added to ReviewList

import React, { Component } from "react"
import { CardBody, Dropdown, DropdownMenu, DropdownToggle, DropdownItem, CardTitle, Button } from "reactstrap"
import TastingManager from "../../modules/TastingManager"

export default class SearchReviewsByTastingForm extends Component {

    state = {
        dropdownOpen: false,
        tastings: []
    }

    componentDidMount() {
        const newState = {}
        TastingManager.getExpand()
            .then(tastings => (newState.tastings = tastings))
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
                <CardTitle>Search by Tastings</CardTitle>
                <CardBody>
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>
                            Tastings
                                </DropdownToggle>
                        <DropdownMenu>
                            {this.state.tastings.map(tasting => {
                                if (tasting.isComplete) {
                                    return <DropdownItem key={tasting.id} onClick={() => this.props.handleSearchByTasting(tasting.id)}>{tasting.theme}</DropdownItem>
                                } else {
                                    return null
                                }
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