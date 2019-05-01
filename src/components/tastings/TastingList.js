// Page displays all whiskies and search form to limit whiskies

import React, { Component } from "react";
import { Card, CardHeader, CardBody, Button } from "reactstrap"
import TastingManager from "./../../modules/TastingManager"
import TastingSearchForm from "./TastingSearchForm"
import TastingIndividualCard from "./TastingIndividualCard"

export default class TastingList extends Component {

    state = {
        tastings: [],
        viewSearchButton: true,
        seeAllTastings: true,
        isSearching: false,
    }

    componentDidMount() {
        const newState = {}
        TastingManager.getAll()
            .then(tastings => (newState.tastings = tastings))
            .then(() => this.setState(newState))
    }

    // Function to changes state of isSearching and display search form
    handleSearchTastings = event => {
        event.preventDefault()
        this.setState({
            viewSearchButton: false,
            isSearching: true,
            seeAllTastings: false
        })
    }

    // Function to changes state of seeAllTastings and display all tastings
    handleSearchAllTastings = event => {
        event.preventDefault()
        this.setState({
            viewSearchButton: true,
            isSearching: false,
            seeAllTastings: true
        })
    }

    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardHeader>Tasting List {this.state.viewSearchButton &&
                        <Button
                            onClick={this.handleSearchTastings}>
                            Search Tastings
                            </Button>}
                    </CardHeader>
                    <CardBody>
                        {this.state.isSearching &&
                            <TastingSearchForm handleSearchAllTastings={this.handleSearchAllTastings} />}
                        {this.state.seeAllTastings &&
                            this.state.tastings.map(tasting =>
                                <TastingIndividualCard key={tasting.id} tasting={tasting} />
                            )
                        }
                    </CardBody>
                </Card>
            </React.Fragment>
        )
    }
}