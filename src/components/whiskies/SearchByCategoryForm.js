// Building a search form for whiskies resource by category to be added to WhiskeyList

import React, { Component } from "react"
import { Card, CardBody, CardHeader, Dropdown, DropdownMenu, DropdownToggle, DropdownItem, CardTitle, Button } from "reactstrap"

export default class SearchByCategoryForm extends Component {

    state = {
        dropdownOpen: false
    }

    // Function to toggle state of dropdown
    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }))
    }

    render() {
        return (
            <React.Fragment>
                <Card
                    className="card-search">
                    <CardBody>
                        <Card
                            className="card-extra-opacity">
                            <CardTitle
                                className="search-form-title"
                                tag={"h5"}>Search by Category</CardTitle>
                            <CardBody>
                                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                    <DropdownToggle
                                        caret
                                        color="success">
                                        Categories
                                </DropdownToggle>
                                    <DropdownMenu>
                                        {this.props.categories.map(category => <DropdownItem key={category.id} onClick={() => this.props.handleSearchByCategory(category.id)}>{category.name}</DropdownItem>)}
                                    </DropdownMenu>
                                    <CardTitle></CardTitle>
                                </Dropdown> {" "}
                                <Button
                                    onClick={this.props.handleCancel}
                                >Cancel</Button>
                            </CardBody>
                        </Card>
                    </CardBody>
                    <CardHeader></CardHeader>
                </Card>
            </React.Fragment>
        )
    }
}