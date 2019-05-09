// Building a search form for reviews resource by tasting to be added to ReviewList

import React, { Component } from "react"
import { CardBody, Dropdown, DropdownMenu, DropdownToggle, DropdownItem, CardTitle, Button, Card, CardHeader } from "reactstrap"
import TastingManager from "../../modules/TastingManager"

export default class SearchReviewsByTastingForm extends Component {

    state = {
        dropdownOpen: false,
        tastings: []
    }

    componentDidMount() {
        const newState = {}
        TastingManager.getExpand()
            .then(tastings => (newState.tastings = tastings))
            .then(() => this.setState(newState))
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
                                tag={"h5"}>Search by Tastings</CardTitle>
                            <CardBody>
                                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                    <DropdownToggle
                                        caret
                                        color="success">
                                        Tastings
                                </DropdownToggle>
                                    <DropdownMenu>
                                        {this.state.tastings.map(tasting => {
                                            if (tasting.isComplete) {
                                                return <DropdownItem key={tasting.id} onClick={() => this.props.handleSearchByTasting(tasting.id)}>{tasting.theme}</DropdownItem>
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