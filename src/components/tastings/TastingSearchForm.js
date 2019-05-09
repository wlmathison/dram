// Building a search form for with search option buttons to be added to TastingList

import React, { Component } from "react"
import { Card, CardBody, Form, Button, CardTitle, CardHeader } from "reactstrap"

export default class TastingSearchForm extends Component {
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
                                tag={"h5"}>Search for tastings by: </CardTitle>
                            <CardBody>
                                <Form
                                    className="search-form-buttons">
                                    <Button
                                        className="search-buttons"
                                        color="info"
                                        type="radio"
                                        onClick={this.props.handleSearchTastingsByDate}
                                    >Date</Button> {" "}
                                    <Button
                                        className="search-buttons"
                                        color="info"
                                        type="radio"
                                        onClick={this.props.handleSearchTastingsByTheme}
                                    >Theme</Button> {" "}
                                    <Button
                                        className="search-buttons"
                                        color="info"
                                        type="radio"
                                        onClick={this.props.handleSearchTastingsByWhiskey}
                                    >Whiskies</Button> {" "}
                                    <Button
                                        className="search-buttons"
                                        color="info"
                                        type="radio"
                                        onClick={this.props.handleSearchTastingsByUser}
                                    >Users</Button> {" "}
                                    <Button
                                        className="search-buttons"
                                        color="info"
                                        type="radio"
                                        onClick={this.props.handleSearchAllTastings}
                                    >All Tastings</Button>
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