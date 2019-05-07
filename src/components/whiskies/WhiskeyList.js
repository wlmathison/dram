// Page displays all whiskies and search form to limit whiskies

import React, { Component } from "react";
import { Card, CardHeader, CardBody, CardTitle, Button } from "reactstrap";
import WhiskeyManager from "./../../modules/WhiskeyManager";
import CategoryManager from "./../../modules/CategoryManager";
import DistilleryManager from "./../../modules/DistilleryManager";
import WhiskeyIndividualCard from "./WhiskeyIndividualCard";
import WhiskeySearchForm from "./WhiskeySearchForm";
import SearchByCategoryForm from "./SearchByCategoryForm"
import SearchByDistilleryForm from "./SearchByDistilleryForm"
import SearchByWhiskeyNameForm from "./SearchByWhiskeyNameForm"


export default class WhiskeyList extends Component {

    state = {
        whiskies: [],
        whiskiesByCategory: [],
        whiskiesByDistillery: [],
        categories: [],
        distilleries: [],
        viewSearchButton: true,
        isSearching: false,
        seeAllWhiskies: true,
        seeWhiskiesBySelectedCategory: false,
        seeWhiskiesBySelectedDistillery: false,
        seeWhiskiesByEnteredName: false,
        isSearchingByCategory: false,
        isSearchingByDistillery: false,
        isSearchingByName: false
    }

    componentDidMount() {
        const newState = {}
        WhiskeyManager.getExpand()
            .then(whiskies => (newState.whiskies = whiskies))
            .then(() => CategoryManager.getAll())
            .then(categories => (newState.categories = categories))
            .then(() => DistilleryManager.getAll())
            .then(distilleries => (newState.distilleries = distilleries))
            .then(() => this.setState(newState))
    }

    // Function to changes state of isSearching and display search form
    handleSearchWhiskies = event => {
        event.preventDefault()
        this.setState({
            viewSearchButton: false,
            isSearching: true,
            seeAllWhiskies: false,
            seeWhiskiesBySelectedCategory: false,
            seeWhiskiesBySelectedDistillery: false,
            seeWhiskiesByEnteredName: false
        })
    }

    // Function to changes state of seeAllWhiskies and display all whiskies
    handleSearchAllWhiskies = event => {
        event.preventDefault()
        this.setState({
            viewSearchButton: true,
            isSearching: false,
            seeAllWhiskies: true
        })
    }

    // Function to handle user clicking search by category and display SearchByCategoryForm
    handleSearchWhiskiesByCategory = event => {
        event.preventDefault()
        this.setState({
            isSearchingByCategory: true,
            isSearching: false,
            viewSearchButton: false
        })
    }

    // Function to handle user clicking search by distillery and display WhiskeySearchByDistilleryForm
    handleSearchWhiskiesByDistillery = event => {
        event.preventDefault()
        this.setState({
            isSearchingByDistillery: true,
            isSearching: false,
            viewSearchButton: false
        })
    }

    // Function to handle user clicking search by name and display WhiskeySearchByNameForm
    handleSearchWhiskiesByName = event => {
        event.preventDefault()
        this.setState({
            isSearchingByName: true,
            isSearching: false,
            viewSearchButton: false
        })

    }

    // Function to handle user clicking a category and display only whiskies matching that category
    handleSearchByCategory = id => {
        this.setState({
            isSearchingByCategory: false,
            whiskiesByCategory: this.state.whiskies.filter(whiskey => whiskey.categoryId === id),
            seeWhiskiesBySelectedCategory: true,
            viewSearchButton: true
        })
    }

    // Function to handle user clicking a distillery and display only whiskies matching that distillery
    handleSearchByDistillery = id => {
        this.setState({
            isSearchingByDistillery: false,
            whiskiesByDistillery: this.state.whiskies.filter(whiskey => whiskey.distilleryId === id),
            seeWhiskiesBySelectedDistillery: true,
            viewSearchButton: true
        })
    }

    // Function to handle user clicking a search button for search by name and display only whiskies matching that name
    handleSearchByName = event => {
        event.preventDefault()
        if (event.target.id === "") {
            window.alert("Please enter a name to search by")
        } else {
            this.setState({
                isSearchingByName: false,
                whiskiesByName: this.state.whiskies.filter(whiskey => whiskey.name.toLowerCase().includes(event.target.id.toLowerCase())),
                seeWhiskiesByEnteredName: true,
                viewSearchButton: true
            })
        }
    }

    // Function to handle user clicking cancel button
    handleCancel = event => {
        event.preventDefault()
        this.setState({
            viewSearchButton: true,
            isSearching: false,
            seeAllWhiskies: true,
            seeWhiskiesBySelectedCategory: false,
            seeWhiskiesBySelectedDistillery: false,
            seeWhiskiesByEnteredName: false,
            isSearchingByCategory: false,
            isSearchingByDistillery: false,
            isSearchingByName: false
        })
    }

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
                        {/* Below are multiple conditional rendering statements to display the imported file depending on the state(whish is listed first) */}
                        {this.state.isSearching &&
                            <WhiskeySearchForm
                                handleSearchAllWhiskies={this.handleSearchAllWhiskies} handleSearchWhiskiesByCategory={this.handleSearchWhiskiesByCategory} handleSearchWhiskiesByDistillery={this.handleSearchWhiskiesByDistillery}
                                handleSearchWhiskiesByName={this.handleSearchWhiskiesByName}
                            />}

                        {this.state.isSearchingByCategory && <SearchByCategoryForm categories={this.state.categories} handleSearchByCategory={this.handleSearchByCategory}
                            handleCancel={this.handleCancel} />}

                        {this.state.isSearchingByDistillery && <SearchByDistilleryForm distilleries={this.state.distilleries} handleSearchByDistillery={this.handleSearchByDistillery} handleCancel={this.handleCancel} />}

                        {this.state.isSearchingByName && <SearchByWhiskeyNameForm handleSearchByName={this.handleSearchByName} handleCancel={this.handleCancel} />}

                        {this.state.seeAllWhiskies &&
                            this.state.whiskies.map(whiskey =>
                                <WhiskeyIndividualCard key={whiskey.id} whiskey={whiskey} myFavorites={this.props.myFavorites} handleDeleteFavorite={this.props.handleDeleteFavorite} handleAddFavorite={this.props.handleAddFavorite} />
                            )
                        }
                        {this.state.seeWhiskiesBySelectedCategory && this.state.whiskiesByCategory.map(whiskey => <WhiskeyIndividualCard key={whiskey.id} whiskey={whiskey} myFavorites={this.props.myFavorites} handleDeleteFavorite={this.props.handleDeleteFavorite} handleAddFavorite={this.props.handleAddFavorite} />
                        )}

                        {this.state.seeWhiskiesBySelectedDistillery && this.state.whiskiesByDistillery.map(whiskey => <WhiskeyIndividualCard key={whiskey.id} whiskey={whiskey} myFavorites={this.props.myFavorites} handleDeleteFavorite={this.props.handleDeleteFavorite} handleAddFavorite={this.props.handleAddFavorite} />
                        )}

                        {this.state.seeWhiskiesByEnteredName && this.state.whiskiesByName.length > 0 && this.state.whiskiesByName.map(whiskey => <WhiskeyIndividualCard key={whiskey.id} whiskey={whiskey} myFavorites={this.props.myFavorites} handleDeleteFavorite={this.props.handleDeleteFavorite} handleAddFavorite={this.props.handleAddFavorite} />
                        )}
                        {this.state.seeWhiskiesByEnteredName && this.state.whiskiesByName.length === 0 &&
                            <Card>
                                <CardBody>
                                    <CardTitle>There are no matching whiskies.</CardTitle>
                                </CardBody>
                            </Card>
                        }
                    </CardBody>
                </Card>
            </React.Fragment>
        )
    }
}