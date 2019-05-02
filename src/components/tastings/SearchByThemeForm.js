// Building a search form for tastings resource by theme to be added to TastingList

import React, { Component } from "react"
import { CardBody, Dropdown, DropdownMenu, DropdownToggle, DropdownItem, CardTitle, Button } from "reactstrap"

export default class SearchByThemeForm extends Component {

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
                <CardTitle>Search by Theme</CardTitle>
                <CardBody>
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>
                            Themes
                                </DropdownToggle>
                        <DropdownMenu>
                            {this.props.tastings.map(tasting => {
                                if (tasting.isComplete) {
                                    return <DropdownItem key={tasting.id} onClick={() => this.props.handleSearchByTheme(tasting.theme)}>{tasting.theme}</DropdownItem>
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