// Page builds one individual card to display tasting results of one whiskey

import React, { Component } from "react"
import { CardText, CardTitle } from "reactstrap"
import RatingManager from "./../../modules/RatingManager"
import StarRatingComponent from 'react-star-rating-component'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'

export default class IndividualResultCard extends Component {

    state = {
        ratings: []
    }

    componentDidMount() {
        RatingManager.get(`?whiskeyId=${this.props.whiskey.id}`)
            .then(ratings => {
                let allRatings = ratings.map(rating => rating.rating)
                this.setState({
                    ratings: allRatings
                })
            })
    }

    render() {
        function getSum(total, num) {
            return total + num
        }
        let rating = 0;
        if (this.state.ratings.length > 0) {
            rating = this.state.ratings.reduce(getSum) / this.state.ratings.length
        }

        let whiskey = this.props.whiskies.find(whiskey => whiskey.id === this.props.selection.whiskeyId)

        if (whiskey !== undefined) {
            if (this.props.myFavorites.some(favorite => favorite.whiskey.id === this.props.whiskey.id)) {
                let favoriteId = this.props.myFavorites.find(favorite => favorite.whiskey.id === this.props.whiskey.id).id
                return (
                    <React.Fragment key={this.props.selection.id}>
                        <CardTitle>#{this.props.i}: {whiskey.name}
                            <IoIosHeart
                                id={favoriteId}
                                color="red"
                                onClick={() => this.props.handleDeleteFavorite(favoriteId)}
                            ></IoIosHeart>
                        </CardTitle>
                        <div>
                            <CardText>Average Rating:</CardText>
                            <StarRatingComponent
                                name={"rating"}
                                starCount={5}
                                value={rating}
                            />
                        </div>
                        <CardText>Size: {whiskey.size}</CardText>
                        <CardText>Price: ${whiskey.price}</CardText>
                        <CardText>Proof: {whiskey.proof}</CardText>
                        <CardText>Age: {whiskey.age}</CardText>
                        <CardText>Category: {whiskey.category.name}</CardText>
                        <CardText>Distillery: {whiskey.distillery.name}</CardText>
                        <hr></hr>
                    </React.Fragment >
                )
            } else {
                return (
                    <React.Fragment key={this.props.selection.id}>
                        <CardTitle>#{this.props.i}: {whiskey.name}
                            <IoIosHeartEmpty
                                id={this.props.whiskey.id}
                                onClick={() => this.props.handleAddFavorite(this.props.whiskey.id)}
                            ></IoIosHeartEmpty>
                        </CardTitle>
                        <div>
                            <CardText>Rating:</CardText>
                            <StarRatingComponent
                                name={"rating"}
                                starCount={5}
                                value={rating}
                            />
                        </div>
                        <CardText>Size: {whiskey.size}</CardText>
                        <CardText>Price: ${whiskey.price}</CardText>
                        <CardText>Proof: {whiskey.proof}</CardText>
                        <CardText>Age: {whiskey.age}</CardText>
                        <CardText>Category: {whiskey.category.name}</CardText>
                        <CardText>Distillery: {whiskey.distillery.name}</CardText>
                        <hr></hr>
                    </React.Fragment >
                )
            }
        }
        else {
            return null
        }
    }
}