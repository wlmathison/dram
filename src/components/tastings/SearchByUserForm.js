// Building a search form for tastings resource by user to be added to TastingList

import React, { Component } from "react"
import { CardBody, Dropdown, DropdownMenu, DropdownToggle, DropdownItem, CardTitle, Button } from "reactstrap"

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
                <CardTitle>Search by User</CardTitle>
                <CardBody>
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>
                            Active Users
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
            </React.Fragment>
        )
    }
}