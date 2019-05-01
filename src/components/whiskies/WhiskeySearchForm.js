// Building a search form for whiskies resource to be added to WhiskeyList

import React, { Component } from "react"
import { CardBody, Form, Dropdown, Input, Button } from "reactstrap"

export default class WhiskeySearchForm extends Component {
    render() {
        return (
            <React.Fragment>
                <CardBody>
                    <Form>
                        <Button
                            type="radio"
                        >Name</Button> {" "}
                        <Button
                            type="radio"
                        >Category</Button> {" "}
                        <Button
                            type="radio"
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