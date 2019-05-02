// Page displays all reviews and search form to limit reviews

import React, { Component } from "react"
import { Card, CardHeader, CardBody, Button } from "reactstrap"
import ReviewManager from "./../../modules/ReviewManager"
import TastingSelectionManager from "./../../modules/TastingSelectionManager"
import ReviewSearchForm from "./ReviewSearchForm"
import ReviewIndividualCard from "./ReviewIndividualCard"

export default class ReviewList extends Component {

    state = {
        reviews: [],
        tastingSelections: [],
        isSearching: false,
        viewSearchButton: true,
        seeAllReviews: true,
        seeReviewsBySelectedWhiskey: false,
        seeReviewsBySelectedUser: false,
        seeReviewsBySelectedTasting: false,
        isSearchingByDate: false,
        isSearchingByWhiskey: false,
        isSearchingByUser: false
    }

    componentDidMount() {
        const newState = {}
        ReviewManager.getAll()
            .then(reviews => (newState.reviews = reviews))
            .then(() => TastingSelectionManager.getAll())
            .then(tastingSelections => (newState.tastingSelections = tastingSelections))
            .then(() => this.setState(newState))
    }

    // Function to changes state of isSearching and display search form
    handleSearchReviews = event => {
        event.preventDefault()
        this.setState({
            viewSearchButton: false,
            isSearching: true,
            seeAllReviews: false,
            seeReviewsBySelectedWhiskey: false,
            seeReviewsBySelectedUser: false,
            seeReviewsBySelectedTasting: false
        })
    }

    // Function to changes state of seeAllReviews and display all reviews
    handleSearchAllReviews = event => {
        event.preventDefault()
        this.setState({
            isSearching: false,
            viewSearchButton: true,
            seeAllReviews: false,
            seeReviewsBySelectedWhiskey: false,
            seeReviewsBySelectedUser: false,
            seeReviewsBySelectedTasting: false,
            isSearchingByDate: false,
            isSearchingByWhiskey: false,
            isSearchingByUser: false
        })
    }

    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardHeader>Reviews {this.state.viewSearchButton &&
                        <Button
                            onClick={this.handleSearchReviews}>
                            Search Reviews
                            </Button>}</CardHeader>
                    <CardBody>
                        {this.state.seeAllReviews &&
                            this.state.reviews.map(review =>
                                <ReviewIndividualCard key={review.id} review={review}
                                    tastingSelections={this.state.tastingSelections} />
                            )
                        }
                        {this.state.isSearching &&
                            <ReviewSearchForm handleSearchAllReviews={this.handleSearchAllReviews} />
                        }
                    </CardBody>
                </Card>
            </React.Fragment>
        )
    }
}