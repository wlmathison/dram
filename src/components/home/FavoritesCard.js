// Page builds card for favorites to display on home page

import React, { Component } from "react"
import { Card, CardBody, CardHeader, CardText, Button } from "reactstrap"

export default class FavoritesCard extends Component {

    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardHeader>Favorites</CardHeader>
                    <CardBody>
                        {this.props.myFavorites.map(favorite =>
                            <Card key={favorite.id}>
                                <CardBody>
                                    <CardText>{favorite.whiskey.name}</CardText>
                                    <Button
                                        id={favorite.id}
                                        onClick={this.props.handleDeleteFavorite}
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