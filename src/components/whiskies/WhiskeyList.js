// Page displays all whiskies and search form to limit whiskies

import React, { Component } from "react";
import { Card, CardHeader, CardBody, Button } from "reactstrap";
import WhiskeyManager from "./../../modules/WhiskeyManager";
import CategoryManager from "./../../modules/CategoryManager";
import WhiskeyIndividualCard from "./WhiskeyIndividualCard";
import WhiskeySearchForm from "./WhiskeySearchForm";
import WhiskeySearchByCategoryForm from "./WhiskeySearchByCategoryForm"


export default class WhiskeyList extends Component {

    state = {
        whiskies: [],
        whiskiesByCategory: [],
        categories: [],
        distilleries: [],
        viewSearchButton: true,
        isSearching: false,
        seeAllWhiskies: true,
        seeWhiskiesBySelectedCategory: false,
        isSearchingByCategory: false,
        isSearchingByDistillery: false,
        isSearchingByName: false
    }

    componentDidMount() {
        const newState = {}
        WhiskeyManager.getAll()
            .then(whiskies => (newState.whiskies = whiskies))
            .then(() => CategoryManager.getAll())
            .then(categories => (newState.categories = categories))
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
            isSearchingByCategory: true,
            isSearching: false,
            viewSearchButton: false
        })
    }

    handleSearchWhiskiesByDistillery = event => {
        event.preventDefault()
        this.setState({
            isSearchingByDistillery: true,
            isSearching: false,
            viewSearchButton: false
        })
    }

    handleSearchWhiskiesByName = event => {
        event.preventDefault()
        this.setState({
            isSearchingByName: true,
            isSearching: false,
            viewSearchButton: false
        })
    }

    handleSearchByCategory = id => {
        this.setState({
            isSearchingByCategory: false,
            whiskiesByCategory: this.state.whiskies.filter(whiskey => whiskey.categoryId === id),
            seeWhiskiesBySelectedCategory: true,
            viewSearchButton: true
        })
    }


    // if (this.state.isSearching) {
    //     
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
                            <WhiskeySearchForm
                                handleSearchAllWhiskies={this.handleSearchAllWhiskies} handleSearchWhiskiesByCategory={this.handleSearchWhiskiesByCategory} handleSearchWhiskiesByDistillery={this.handleSearchWhiskiesByDistillery}
                                handleSearchWhiskiesByName={this.handleSearchWhiskiesByName}
                            />}
                        {this.state.isSearchingByCategory && <WhiskeySearchByCategoryForm categories={this.state.categories} handleSearchByCategory={this.handleSearchByCategory} />}
                        {this.state.seeAllWhiskies &&
                            this.state.whiskies.map(whiskey =>
                                <WhiskeyIndividualCard key={whiskey.id} whiskey={whiskey} />
                            )
                        }
                        {this.state.seeWhiskiesBySelectedCategory && this.state.whiskiesByCategory.map(whiskey => <WhiskeyIndividualCard key={whiskey.id} whiskey={whiskey} />
                        )}
                    </CardBody>
                </Card>
            </React.Fragment>
        )
    }
}