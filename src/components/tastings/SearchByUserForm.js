// Building a search form for tastings resource by user to be added to TastingList

import React, { Component } from "react"
import { CardBody, Dropdown, DropdownMenu, DropdownToggle, DropdownItem, CardTitle, Button, Card, CardHeader } from "reactstrap"

export default class SearchByUserForm extends Component {

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
                                tag={"h5"}>Search by User</CardTitle>
                            <CardBody>
                                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                    <DropdownToggle
                                        caret
                                        color="success">                                        Active Users
                                </DropdownToggle>
                                    <DropdownMenu>
                                        {this.props.users.map(user => {
                                            if (user.isActive) {
                                                return <DropdownItem key={user.id} onClick={() => this.props.handleSearchByUser(user.id)}>{user.userName}</DropdownItem>
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
                        </Card>
                    </CardBody>
                    <CardHeader></CardHeader>
                </Card>
            </React.Fragment>
        )
    }
}