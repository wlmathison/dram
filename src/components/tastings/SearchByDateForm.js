// Building a search form for tastings resource by date to be added to TastingList

import React, { Component } from "react"
import { CardBody, Dropdown, DropdownMenu, DropdownToggle, DropdownItem, CardTitle, Button } from "reactstrap"

export default class SearchByDateForm extends Component {

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
                <CardTitle>Search by Date</CardTitle>
                <CardBody>
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>
                            Dates
                                </DropdownToggle>
                        <DropdownMenu>
                            {this.props.tastings.map(tasting => <DropdownItem key={tasting.id} onClick={() => this.props.handleSearchByDate(tasting.date)}>{tasting.date}</DropdownItem>)}
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