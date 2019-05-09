// Building a search form for with search option buttons to be added to WhiskeyList

import React, { Component } from "react"
import { CardBody, Form, Button, CardTitle, Card, CardHeader } from "reactstrap"

export default class WhiskeySearchForm extends Component {
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
                                tag={"h5"}>Search for whiskies by: </CardTitle>
                            <CardBody>
                                <Form
                                    className="search-form-buttons">
                                    <Button
                                        className="search-buttons"
                                        color="info"
                                        type="radio"
                                        onClick={this.props.handleSearchWhiskiesByName}
                                    >Name</Button>
                                    <Button
                                        className="search-buttons"
                                        color="info"
                                        type="radio"
                                        onClick={this.props.handleSearchWhiskiesByCategory}
                                    >Category</Button>
                                    <Button
                                        className="search-buttons"
                                        color="info"
                                        type="radio"
                                        onClick={this.props.handleSearchWhiskiesByDistillery}
                                    >Distillery</Button>
                                    <Button
                                        className="search-buttons"
                                        color="info"
                                        type="radio"
                                        onClick={this.props.handleSearchAllWhiskies}
                                    >All Whiskies</Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </CardBody>
                    <CardHeader></CardHeader>
                </Card>
            </React.Fragment>
        )
    }
}