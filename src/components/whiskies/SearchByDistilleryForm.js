// Building a search form for whiskies resource by distillery to be added to WhiskeyList

import React, { Component } from "react"
import { Card, CardHeader, CardBody, Dropdown, DropdownMenu, DropdownToggle, DropdownItem, CardTitle, Button } from "reactstrap"

export default class SearchByDistilleryForm extends Component {

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
                                tag={"h5"}>Search by Distillery</CardTitle>
                            <CardBody>
                                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                    <DropdownToggle
                                        caret
                                        color="success">
                                        Distilleries
                                </DropdownToggle>
                                    <DropdownMenu>
                                        {this.props.distilleries.map(distillery => <DropdownItem key={distillery.id} onClick={() => this.props.handleSearchByDistillery(distillery.id)}>{distillery.name}</DropdownItem>)}
                                    </DropdownMenu>
                                    <CardTitle></CardTitle>
                                </Dropdown>
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