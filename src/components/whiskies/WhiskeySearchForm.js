// Building a search form for with serach option buttons to be added to WhiskeyList

import React, { Component } from "react"
import { CardBody, Form, Button, CardTitle } from "reactstrap"

export default class WhiskeySearchForm extends Component {
    render() {
        return (
            <React.Fragment>
                <CardTitle>Search for whiskies by: </CardTitle>
                <CardBody>
                    <Form>
                        <Button
                            type="radio"
                            onClick={this.props.handleSearchWhiskiesByName}
                        >Name</Button> {" "}
                        <Button
                            type="radio"
                            onClick={this.props.handleSearchWhiskiesByCategory}
                        >Category</Button> {" "}
                        <Button
                            type="radio"
                            onClick={this.props.handleSearchWhiskiesByDistillery}
                        >Distillery</Button> {" "}
                        <Button
                            type="radio"
                            onClick={this.props.handleSearchAllWhiskies}
                        >All Whiskies</Button>
                    </Form>
                </CardBody>
            </React.Fragment>
        )
    }
}