// Building a search form for whiskies resource by category to be added to WhiskeyList

import React, { Component } from "react"
import { CardBody, Dropdown, DropdownMenu, DropdownToggle, DropdownItem, CardTitle, Button } from "reactstrap"

export default class SearchByCategoryForm extends Component {

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
                <CardTitle>Search by Category</CardTitle>
                <CardBody>
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>
                            Categories
                                </DropdownToggle>
                        <DropdownMenu>
                            {this.props.categories.map(category => <DropdownItem key={category.id} onClick={() => this.props.handleSearchByCategory(category.id)}>{category.name}</DropdownItem>)}
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