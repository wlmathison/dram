// Page displays all whiskies and search form to limit whiskies

import React, { Component } from "react";
import { Card, CardHeader, CardTitle, CardBody, Button } from "reactstrap";
import WhiskeyManager from "./../../modules/WhiskeyManager";
import WhiskeyIndividualCard from "./WhiskeyIndividualCard";
import WhiskeySearchForm from "./WhiskeySearchForm";


export default class WhiskeyList extends Component {

    state = {
        whiskies: [],
        isSearching: false
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
            isSearching: true
        })
    }

    handleSearchAllWhiskies = event => {
        event.preventDefault()
        this.setState({
            isSearching: false
        })
    }

    render() {
        return (
            <React.Fragment>
                <Card>
                    {this.state.isSearching ? (
                        <React.Fragment>
                            <CardHeader>Whiskey List
                    </CardHeader>
                            <CardBody>
                                <CardTitle>Search for whiskies by: </CardTitle>
                                <WhiskeySearchForm handleSearchAllWhiskies={this.handleSearchAllWhiskies}/>
                            </CardBody>
                        </React.Fragment>
                    ) : (
                            <React.Fragment>
                                <CardHeader>Whiskey List
                                    <Button
                                        onClick={this.handleSearchWhiskies}>
                                        Search Whiskies
                                    </Button>
                                </CardHeader>
                                {this.state.whiskies.map(whiskey =>
                                    <WhiskeyIndividualCard key={whiskey.id} whiskey={whiskey} />
                                )}
                            </React.Fragment>
                        )}
                </Card>
            </React.Fragment>
        )
    }
}