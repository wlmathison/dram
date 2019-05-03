// Page builds card for favorites to display on home page

import React, { Component } from "react"
import { Card, CardBody, CardHeader, CardText, Button } from "reactstrap"
import FavoritesManager from "./../../modules/FavoritesManager"

export default class FavoritesCard extends Component {

    state = {
        myFavorites: []
    }

    componentDidMount() {
        const newState = {}
        FavoritesManager.getExpand()
            .then(favorites => newState.myFavorites = favorites.filter(favorite => favorite.userId === parseInt(sessionStorage.getItem("userId"))))
            .then(() => this.setState(newState))
    }

    handleDelete = event => {
        event.preventDefault()
        const newState = {}
        if (window.confirm("Are you sure you want to delete this favorite")) {
            FavoritesManager.delete(event.target.id)
                .then(() => FavoritesManager.getExpand())
                .then(favorites => newState.myFavorites = favorites.filter(favorite => favorite.userId === parseInt(sessionStorage.getItem("userId"))))
                .then(() => this.setState(newState))
        }

    }

    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardHeader>Favorites</CardHeader>
                    <CardBody>
                        {this.state.myFavorites.map(favorite =>
                            <Card key={favorite.id}>
                                <CardBody>
                                    <CardText>{favorite.whiskey.name}</CardText>
                                    <Button
                                        id={favorite.id}
                                        onClick={this.handleDelete}
                                    >Delete</Button>
                                </CardBody>
                            </Card>

                        )
                        }
                    </CardBody>
                </Card>
            </React.Fragment>
        )
    }
}