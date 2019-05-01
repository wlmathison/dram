// Building a search form for whiskies resource by distillery to be added to WhiskeyList

import React, { Component } from "react"
import { CardBody, Dropdown, DropdownMenu, DropdownToggle, DropdownItem, CardTitle, Button } from "reactstrap"

export default class SearchByDistilleryForm extends Component {

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
                <CardTitle>Search by Distillery</CardTitle>
                <CardBody>
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>
                            Distilleries
                                </DropdownToggle>
                        <DropdownMenu>
                            {this.props.distilleries.map(distillery => <DropdownItem key={distillery.id} onClick={() => this.props.handleSearchByDistillery(distillery.id)}>{distillery.name}</DropdownItem>)}
                        </DropdownMenu>
                    </Dropdown>
                    <Button
                    onClick={this.props.handleCancel}
                    >Cancel</Button>
                </CardBody>
            </React.Fragment>
        )
    }
}