// Page renders the tasting results showing user details about each whiskey from the completed tasting

import React, { Component } from "react"
import { Card, CardHeader } from "reactstrap"
import WhiskeyManager from "./../../modules/WhiskeyManager"
import CategoryManager from "./../../modules/CategoryManager"
import DistilleryManager from "./../../modules/DistilleryManager"
import IndividualResultCard from "./IndividualResultCard"

export default class ResultsList extends Component {
    state = {
        whiskies: []
    }

    componentDidMount() {
        const newState = {}
        newState.tastingSelections = this.props.activeTasting.tastingSelections
        WhiskeyManager.getExpand()
            .then(whiskies => (newState.whiskies = whiskies))
            .then(() => CategoryManager.getAll())
            .then(categories => (newState.categories = categories))
            .then(() => DistilleryManager.getAll())
            .then(distilleries => (newState.distilleries = distilleries))
            .then(() => this.setState(newState))
    }

    render() {
        let i = 0;
        return (
            <React.Fragment>
                <Card>
                    <CardHeader>Tasting Results</CardHeader>
                    {this.state.tastingSelections !== undefined &&
                        this.props.activeTasting.tastingSelections.map(selection => {
                            let whiskey = this.state.whiskies.find(whiskey => whiskey.id === selection.whiskeyId)
                            i++
                            return <IndividualResultCard key={i} i={i} activeTasting={this.props.activeTasting} selection={selection} whiskies={this.state.whiskies} whiskey={whiskey} myFavorites={this.props.myFavorites} handleDeleteFavorite={this.props.handleDeleteFavorite} handleAddFavorite={this.props.handleAddFavorite} />
                        })
                    }
                </Card>
            </React.Fragment>
        )
    }
}