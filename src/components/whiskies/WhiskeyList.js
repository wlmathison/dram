// Page displays all whiskies and search form to limit whiskies

import React, { Component } from "react";
import { Card, CardHeader, CardTitle, CardBody, Button } from "reactstrap";
import WhiskeyManager from "./../../modules/WhiskeyManager";
import WhiskeyIndividualCard from "./WhiskeyIndividualCard";
import WhiskeySearchForm from "./WhiskeySearchForm";


export default class WhiskeyList extends Component {

    state = {
        whiskies: [],
        viewSearchButton: true,
        isSearching: false,
        seeAllWhiskies: true,
        isSearchingByCategory: false,
        isSearchingByDistillery: false,
        isSearchingByName: false,
    }

    componentDidMount() {
        const newState = {}
        WhiskeyManager.getAll()
            .then(whiskies => (newState.whiskies = whiskies))
            .then(() => this.setState(newState))
    }

    handleSearchWhiskies = event => {
        event.preventDefault()
        this.setState({
            viewSearchButton: false,
            isSearching: true,
            seeAllWhiskies: false
        })
    }

    handleSearchAllWhiskies = event => {
        event.preventDefault()
        this.setState({
            viewSearchButton: true,
            isSearching: false,
            seeAllWhiskies: true
        })
    }

    handleSearchWhiskiesByCategory = event => {
        event.preventDefault()
        this.setState({
            isSearchingByCategory: true
        })
    }

    handleSearchWhiskiesByDistillery = event => {
        event.preventDefault()
        this.setState({
            isSearchingByDistillery: true
        })
    }

    handleSearchWhiskiesByName = event => {
        event.preventDefault()
        this.setState({
            isSearchingByName: true
        })
    }


    // if (this.state.isSearching) {
    //     {this.state.isSearchingByCategory && < />}
    //     {this.state.isSearchingByDistillery && < />}
    //     {this.state.isSearchingByName && < />}

    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardHeader>Whiskey List {this.state.viewSearchButton &&
                        <Button
                            onClick={this.handleSearchWhiskies}>
                            Search Whiskies
                            </Button>}
                    </CardHeader>
                    <CardBody>
                        {this.state.isSearching &&
                            <React.Fragment><CardTitle>Search for whiskies by: </CardTitle>
                                <WhiskeySearchForm
                                    handleSearchAllWhiskies={this.handleSearchAllWhiskies} handleSearchWhiskiesByCategory={this.handleSearchWhiskiesByCategory} handleSearchWhiskiesByDistillery={this.handleSearchWhiskiesByDistillery}
                                    handleSearchWhiskiesByName={this.handleSearchWhiskiesByName}
                                /></React.Fragment>}
                        {this.state.seeAllWhiskies &&
                            this.state.whiskies.map(whiskey =>
                                <WhiskeyIndividualCard key={whiskey.id} whiskey={whiskey} />
                            )
                        }
                    </CardBody>
                </Card>
            </React.Fragment>
        )
    }
}