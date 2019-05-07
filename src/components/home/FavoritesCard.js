// Page builds card for favorites to display on home page

import React, { Component } from "react"
import { Card, CardBody, CardHeader, CardText } from "reactstrap"
import { IoIosHeart } from 'react-icons/io';

export default class FavoritesCard extends Component {

    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardHeader>Favorites</CardHeader>
                    <CardBody>
                        {this.props.myFavorites !== undefined && this.props.myFavorites.map(favorite =>
                            <Card key={favorite.id}>
                                <CardBody>
                                    <CardText>{favorite.whiskey.name}                                    <IoIosHeart
                                        id={favorite.id}
                                        color="red"
                                        onClick={() => this.props.handleConfirmDeleteFavorite(favorite.id)}
                                    ></IoIosHeart>
                                    </CardText>

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