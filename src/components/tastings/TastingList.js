// Page displays all whiskies and search form to limit whiskies

import React, { Component } from "react";
import { Card, CardHeader, CardBody, Button } from "reactstrap"
import TastingManager from "./../../modules/TastingManager"
import TastingSearchForm from "./TastingSearchForm"
import TastingIndividualCard from "./TastingIndividualCard"
import SearchByDateForm from "./SearchByDateForm"
import SearchByThemeForm from "./SearchByThemeForm"

export default class TastingList extends Component {

    state = {
        tastings: [],
        tastingsByDate: [],
        tastingsByTheme: [],
        viewSearchButton: true,
        isSearching: false,
        seeAllTastings: true,
        seeTastingsBySelectedDate: false,
        seeTastingsBySelectedTheme: false,
        seeTastingsBySelectedWhiskies: false,
        seeTastingsBySelectedUsers: false,
        isSearchingByDate: false,
        isSearchingByTheme: false,
        isSearchingByWhiskies: false,
        isSearchingByUsers: false
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
            seeAllTastings: true,
            seeTastingsBySelectedDate: false,
            seeTastingsBySelectedTheme: false,
            seeTastingsBySelectedWhiskies: false,
            seeTastingsBySelectedUsers: false,
            isSearchingByDate: false,
            isSearchingByTheme: false,
            isSearchingByWhiskies: false,
            isSearchingByUsers: false
        })
    }

    // Function to handle user clicking search by date and display SearchByDateForm
    handleSearchTastingsByDate = event => {
        event.preventDefault()
        this.setState({
            isSearchingByDate: true,
            isSearching: false,
            viewSearchButton: false
        })
    }

    // Function to handle user clicking a date and display only tastings matching that date
    handleSearchByDate = date => {
        this.setState({
            isSearchingByDate: false,
            tastingsByDate: this.state.tastings.filter(tasting => tasting.date === date),
            seeTastingsBySelectedDate: true,
            viewSearchButton: true
        })
    }

    // Function to handle user clicking search by theme and display SearchByThemeForm
    handleSearchTastingsByTheme = event => {
        event.preventDefault()
        this.setState({
            isSearchingByTheme: true,
            isSearching: false,
            viewSearchButton: false
        })
    }

    // Function to handle user clicking a theme and display only tastings matching that theme
    handleSearchByTheme = theme => {
        this.setState({
            isSearchingByTheme: false,
            tastingsByTheme: this.state.tastings.filter(tasting => tasting.theme === theme),
            seeTastingsBySelectedTheme: true,
            viewSearchButton: true
        })
    }

    // Function to handle user clicking cancel button
    handleCancel = event => {
        event.preventDefault()
        this.setState({
            viewSearchButton: true,
            isSearching: false,
            seeAllTastings: true,
            seeTastingsBySelectedDate: false,
            seeTastingsBySelectedTheme: false,
            seeTastingsBySelectedWhiskies: false,
            seeTastingsBySelectedUsers: false,
            isSearchingByDate: false,
            isSearchingByTheme: false,
            isSearchingByWhiskies: false,
            isSearchingByUsers: false
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
                            <TastingSearchForm handleSearchAllTastings={this.handleSearchAllTastings} handleSearchTastingsByDate={this.handleSearchTastingsByDate} handleSearchTastingsByTheme={this.handleSearchTastingsByTheme} />
                        }
                        {this.state.seeAllTastings &&
                            this.state.tastings.map(tasting =>
                                <TastingIndividualCard key={tasting.id} tasting={tasting} />
                            )
                        }
                        {this.state.isSearchingByDate && <SearchByDateForm tastings={this.state.tastings} handleSearchByDate={this.handleSearchByDate}
                            handleCancel={this.handleCancel} />
                        }
                        {this.state.seeTastingsBySelectedDate && this.state.tastingsByDate.map(tasting => <TastingIndividualCard key={tasting.id} tasting={tasting} />
                        )}
                        {this.state.isSearchingByTheme && <SearchByThemeForm tastings={this.state.tastings} handleSearchByTheme={this.handleSearchByTheme}
                            handleCancel={this.handleCancel} />
                        }
                        {this.state.seeTastingsBySelectedTheme && this.state.tastingsByTheme.map(tasting => <TastingIndividualCard key={tasting.id} tasting={tasting} />
                        )}
                    </CardBody>
                </Card>
            </React.Fragment>
        )
    }
}