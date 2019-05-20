// Building a search form for tastings resource by date to be added to TastingList

import React, { Component } from "react"
import { CardBody, Dropdown, DropdownMenu, DropdownToggle, DropdownItem, CardTitle, Button, Card, CardHeader } from "reactstrap"

export default class SearchByDateForm extends Component {

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
                                tag={"h5"}>Search by Date</CardTitle>
                            <CardBody>
                                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                    <DropdownToggle
                                        caret
                                        color="success">                            Dates
                                </DropdownToggle>
                                    <DropdownMenu>
                                        {this.props.tastings.map(tasting => {
                                            let dateArray = tasting.date.split('-')
                                            dateArray.push(dateArray.shift())
                                            let date = dateArray.join('/')
                                            if (tasting.isComplete) {
                                                return <DropdownItem key={tasting.id} onClick={() => this.props.handleSearchByDate(tasting.date)}>{date}</DropdownItem>
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