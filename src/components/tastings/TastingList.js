// Page displays all whiskies and search form to limit whiskies

import React, { Component } from "react";
import { Card, CardHeader, CardBody, CardTitle, Button } from "reactstrap"
import TastingManager from "./../../modules/TastingManager"
import TastingSelectionManager from "./../../modules/TastingSelectionManager"
import TastingAttendanceManager from "./../../modules/TastingAttendanceManager"
import TastingSearchForm from "./TastingSearchForm"
import TastingIndividualCard from "./TastingIndividualCard"
import SearchByDateForm from "./SearchByDateForm"
import SearchByThemeForm from "./SearchByThemeForm"
import SearchByWhiskeyForm from "./SearchByWhiskeyForm"
import SearchByUserForm from "./SearchByUserForm"

export default class TastingList extends Component {

    state = {
        tastings: [],
        tastingSelections: [],
        tastingAttendance: [],
        tastingsByDate: [],
        tastingsByTheme: [],
        tastingsByWhiskey: [],
        tastingsByUser: [],
        viewSearchButton: true,
        isSearching: false,
        seeAllTastings: true,
        seeTastingsBySelectedDate: false,
        seeTastingsBySelectedTheme: false,
        seeTastingsBySelectedWhiskey: false,
        seeTastingsBySelectedUser: false,
        isSearchingByDate: false,
        isSearchingByTheme: false,
        isSearchingByWhiskies: false,
        isSearchingByUsers: false
    }

    componentDidMount() {
        const newState = {}
        TastingManager.getExpand()
            .then(tastings => (newState.tastings = tastings))
            .then(() => TastingSelectionManager.getExpand())
            .then(tastingSelections => (newState.tastingSelections = tastingSelections))
            .then(() => TastingAttendanceManager.getExpand())
            .then(tastingAttendance => (newState.tastingAttendance = tastingAttendance))
            .then(() => this.setState(newState))
    }

    // Function to changes state of isSearching and display search form
    handleSearchTastings = event => {
        event.preventDefault()
        this.setState({
            viewSearchButton: false,
            isSearching: true,
            seeAllTastings: false,
            seeTastingsBySelectedDate: false,
            seeTastingsBySelectedTheme: false,
            seeTastingsBySelectedWhiskey: false,
            seeTastingsBySelectedUser: false
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
            seeTastingsBySelectedWhiskey: false,
            seeTastingsBySelectedUser: false,
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

    // Function to handle user clicking search by whiskey and display SearchByWhiskeyForm
    handleSearchTastingsByWhiskey = event => {
        event.preventDefault()
        this.setState({
            isSearchingByWhiskies: true,
            isSearching: false,
            viewSearchButton: false
        })
    }

    // Function to handle user clicking a whiskey and display only tastings matching that whiskey
    handleSearchByWhiskey = whiskey => {
        this.setState({
            isSearchingByWhiskies: false,
            tastingsByWhiskey: this.state.tastings.filter(tasting => tasting.tastingSelections.some(tastingSelection => tastingSelection.whiskeyId === whiskey)),
            seeTastingsBySelectedWhiskey: true,
            viewSearchButton: true
        })
    }

    // Function to handle user clicking search by user and display SearchByUserForm
    handleSearchTastingsByUser = event => {
        event.preventDefault()
        this.setState({
            isSearchingByUsers: true,
            isSearching: false,
            viewSearchButton: false
        })
    }

    // Function to handle user clicking a user and display only tastings matching that user
    handleSearchByUser = user => {
        this.setState({
            isSearchingByUsers: false,
            tastingsByUser: this.state.tastings.filter(tasting => tasting.tastingAttendance.some(tastingAttendance => tastingAttendance.userId === user)),
            seeTastingsBySelectedUser: true,
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
            seeTastingsBySelectedWhiskey: false,
            seeTastingsBySelectedUser: false,
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
                        {/* Below are multiple conditional rendering statements to display the imported file depending on the state(whish is listed first) */}
                        {this.state.isSearching &&
                            <TastingSearchForm handleSearchAllTastings={this.handleSearchAllTastings} handleSearchTastingsByDate={this.handleSearchTastingsByDate} handleSearchTastingsByTheme={this.handleSearchTastingsByTheme} handleSearchTastingsByWhiskey={this.handleSearchTastingsByWhiskey} handleSearchTastingsByUser={this.handleSearchTastingsByUser} />
                        }
                        {this.state.seeAllTastings &&
                            this.state.tastings.map(tasting =>
                                <TastingIndividualCard key={tasting.id} tasting={tasting} tastingSelections={this.state.tastingSelections} tastingAttendance={this.state.tastingAttendance} />
                            )
                        }
                        {this.state.isSearchingByDate && <SearchByDateForm tastings={this.state.tastings} handleSearchByDate={this.handleSearchByDate}
                            handleCancel={this.handleCancel} />
                        }
                        {this.state.seeTastingsBySelectedDate && this.state.tastingsByDate.map(tasting => <TastingIndividualCard key={tasting.id} tasting={tasting} tastingSelections={this.state.tastingSelections} tastingAttendance={this.state.tastingAttendance} />
                        )}
                        {this.state.isSearchingByTheme && <SearchByThemeForm tastings={this.state.tastings} handleSearchByTheme={this.handleSearchByTheme}
                            handleCancel={this.handleCancel} />
                        }
                        {this.state.seeTastingsBySelectedTheme && this.state.tastingsByTheme.map(tasting => <TastingIndividualCard key={tasting.id} tasting={tasting} tastingSelections={this.state.tastingSelections} tastingAttendance={this.state.tastingAttendance} />
                        )}
                        {this.state.isSearchingByWhiskies && <SearchByWhiskeyForm tastingSelections={this.state.tastingSelections} handleSearchByWhiskey={this.handleSearchByWhiskey}
                            handleCancel={this.handleCancel} />
                        }
                        {this.state.seeTastingsBySelectedWhiskey && this.state.tastingsByWhiskey.map(tasting => <TastingIndividualCard key={tasting.id} tasting={tasting} tastingSelections={this.state.tastingSelections} tastingAttendance={this.state.tastingAttendance} />
                        )}
                        {this.state.isSearchingByUsers && <SearchByUserForm users={this.props.users} tastingAttendance={this.state.tastingAttendance} handleSearchByUser={this.handleSearchByUser}
                            handleCancel={this.handleCancel} />
                        }
                        {this.state.seeTastingsBySelectedUser && this.state.tastingsByUser.length > 0 && this.state.tastingsByUser.map(tasting => <TastingIndividualCard key={tasting.id} tasting={tasting} tastingSelections={this.state.tastingSelections} tastingAttendance={this.state.tastingAttendance} />
                        )}
                        {this.state.seeTastingsBySelectedUser && this.state.tastingsByUser.length === 0 &&
                            <Card>
                                <CardBody>
                                    <CardTitle>This user has not attended any tastings.</CardTitle>
                                </CardBody>
                            </Card>
                        }
                    </CardBody>
                </Card>
            </React.Fragment>
        )
    }
}