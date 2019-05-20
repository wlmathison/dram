// Page builds the activate user form for admin page

import React, { Component } from "react"
import { Card, CardBody, Form, Button, CardHeader, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"

export default class ActivateUser extends Component {

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
            <Card
                className="card-first">
                <CardHeader>Activate User</CardHeader>
                <Card
                    className="card-search">
                    <CardBody>
                        <Card
                            className="card-extra-opacity">
                            <CardBody>
                                <Form
                                    className="search-form-buttons">
                                    <Dropdown
                                        isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                        <DropdownToggle
                                            className="search-buttons"
                                            caret
                                            color="success">
                                            Activate Selected User
                                             </DropdownToggle>
                                        <DropdownMenu>
                                            {this.props.users.some(user => user.isActive === false) && this.props.users.map(user => {
                                                if (!user.isActive) {
                                                    return <DropdownItem
                                                        key={user.id}
                                                        id={user.id}
                                                        onClick={this.props.handleActivate} >{user.userName}</DropdownItem>
                                                } else {
                                                    return null
                                                }
                                            })}
                                            {!this.props.users.some(user => user.isActive === false) && <DropdownItem
                                            >No Inactive Users</DropdownItem>
                                            }
                                        </DropdownMenu>
                                    </Dropdown>
                                    <Button
                                        className="search-buttons"
                                        onClick={this.props.handleCancel}
                                    >Cancel</Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </CardBody>
                    <CardHeader></CardHeader>
                </Card>
            </Card>
        )
    }
}