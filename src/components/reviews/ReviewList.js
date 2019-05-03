// Page displays all reviews and search form to limit reviews

import React, { Component } from "react"
import { Card, CardHeader, CardBody, CardTitle, Button } from "reactstrap"
import ReviewManager from "./../../modules/ReviewManager"
import TastingSelectionManager from "./../../modules/TastingSelectionManager"
import ReviewSearchForm from "./ReviewSearchForm"
import ReviewIndividualCard from "./ReviewIndividualCard"
import SearchReviewsByWhiskeyForm from "./SearchReviewsByWhiskeyForm"

export default class ReviewList extends Component {

    state = {
        reviews: [],
        reviewsByWhiskey: [],
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
            seeAllReviews: true,
            seeReviewsBySelectedWhiskey: false,
            seeReviewsBySelectedUser: false,
            seeReviewsBySelectedTasting: false,
            isSearchingByDate: false,
            isSearchingByWhiskey: false,
            isSearchingByUser: false
        })
    }

    // Function to handle user clicking search by whiskey and display SearchByWhiskeyForm
    handleSearchReviewsByWhiskey = event => {
        event.preventDefault()
        this.setState({
            isSearchingByWhiskey: true,
            isSearching: false,
            viewSearchButton: false
        })
    }

    // Function to handle user clicking a whiskey and display only reviews matching that whiskey
    handleSearchByWhiskey = whiskey => {
        this.setState({
            isSearchingByWhiskey: false,
            reviewsByWhiskey: this.state.reviews.filter(review => review.tastingSelection.whiskeyId === whiskey),
            seeReviewsBySelectedWhiskey: true,
            viewSearchButton: true
        })
    }

    // Function to handle user clicking cancel button
    handleCancel = event => {
        event.preventDefault()
        this.setState({
            isSearching: false,
            viewSearchButton: true,
            seeAllReviews: true,
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
                        {this.state.isSearching &&
                            <ReviewSearchForm handleSearchAllReviews={this.handleSearchAllReviews} handleSearchReviewsByWhiskey={this.handleSearchReviewsByWhiskey} />
                        }
                        {this.state.seeAllReviews &&
                            this.state.reviews.map(review =>
                                <ReviewIndividualCard key={review.id} review={review}
                                    tastingSelections={this.state.tastingSelections} />
                            )
                        }
                        {this.state.isSearchingByWhiskey && <SearchReviewsByWhiskeyForm handleSearchByWhiskey={this.handleSearchByWhiskey} handleCancel={this.handleCancel} />
                        }
                        {this.state.seeReviewsBySelectedWhiskey && this.state.reviewsByWhiskey.length > 0 &&
                            this.state.reviewsByWhiskey.map(review =>
                                <ReviewIndividualCard key={review.id} review={review}
                                    tastingSelections={this.state.tastingSelections} />
                            )
                        }
                        {this.state.seeReviewsBySelectedWhiskey && this.state.reviewsByWhiskey.length === 0 &&
                            <Card>
                            <CardBody>
                                <CardTitle>There are no reviews for this whiskey.</CardTitle>
                            </CardBody>
                        </Card>
                        }
                    </CardBody>
                </Card>
            </React.Fragment>
        )
    }
}