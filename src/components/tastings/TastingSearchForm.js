// Building a search form for with search option buttons to be added to TastingList

import React, { Component } from "react"
import { CardBody, Form, Button, CardTitle } from "reactstrap"

export default class TastingSearchForm extends Component {
    render() {
        return (
            <React.Fragment>
                <CardTitle>Search for tastings by: </CardTitle>
                <CardBody>
                    <Form>
                        <Button
                            type="radio"
                            onClick={this.props.handleSearchTastingsByDate}
                        >Date</Button> {" "}
                        <Button
                            type="radio"
                            onClick={this.props.handleSearchTastingsByTheme}
                        >Theme</Button> {" "}
                        <Button
                            type="radio"
                            onClick={this.props.handleSearchTastingsByWhiskey}
                        >Whiskies</Button> {" "}
                        <Button
                            type="radio"
                            onClick={this.props.handleSearchWhiskiesByDistillery}
                        >Users</Button> {" "}
                        <Button
                            type="radio"
                            onClick={this.props.handleSearchAllTastings}
                        >All Tastings</Button>
                    </Form>
                </CardBody>
            </React.Fragment>
        )
    }
}