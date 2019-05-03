// Page displays all reviews and search form to limit reviews

import React, { Component } from "react"
import { Card, CardHeader, CardBody, CardTitle, Button } from "reactstrap"
import ReviewManager from "./../../modules/ReviewManager"
import TastingSelectionManager from "./../../modules/TastingSelectionManager"
import ReviewSearchForm from "./ReviewSearchForm"
import ReviewIndividualCard from "./ReviewIndividualCard"
import SearchReviewsByWhiskeyForm from "./SearchReviewsByWhiskeyForm"
import SearchReviewsByUserForm from "./SearchReviewsByUserForm"
import SearchReviewsByTastingForm from "./SearchReviewsByTastingForm"
import ReviewEditForm from "./ReviewEditForm"

export default class ReviewList extends Component {

    state = {
        reviews: [],
        reviewsByWhiskey: [],
        reviewsByUser: [],
        reviewsByTasting: [],
        tastingSelections: [],
        reviewToEdit: {},
        editedReview: "",
        isSearching: false,
        isEditing: false,
        viewSearchButton: true,
        seeAllReviews: true,
        seeReviewsBySelectedWhiskey: false,
        seeReviewsBySelectedUser: false,
        seeReviewsBySelectedTasting: false,
        isSearchingByTasting: false,
        isSearchingByWhiskey: false,
        isSearchingByUser: false
    }

    componentDidMount() {
        const newState = {}
        ReviewManager.getExpand()
            .then(reviews => (newState.reviews = reviews))
            .then(() => TastingSelectionManager.getExpand())
            .then(tastingSelections => (newState.tastingSelections = tastingSelections))
            .then(() => this.setState(newState))
    }

    // Function to change state of editedReview when button clicked
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    // Function to changes state of isSearching and display search form
    handleSearchReviews = event => {
        event.preventDefault()
        this.setState({
            viewSearchButton: false,
            isSearching: true,
            isEditing: false,
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
            isEditing: false,
            viewSearchButton: true,
            seeAllReviews: true,
            seeReviewsBySelectedWhiskey: false,
            seeReviewsBySelectedUser: false,
            seeReviewsBySelectedTasting: false,
            isSearchingByTasting: false,
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

    // Function to handle user clicking search by user and display SearchByUserForm
    handleSearchReviewsByUser = event => {
        event.preventDefault()
        this.setState({
            isSearchingByUser: true,
            isSearching: false,
            viewSearchButton: false
        })
    }

    // Function to handle user clicking a user and display only reviews matching that user
    handleSearchByUser = user => {
        this.setState({
            isSearchingByUser: false,
            reviewsByUser: this.state.reviews.filter(review => review.userId === user),
            seeReviewsBySelectedUser: true,
            viewSearchButton: true
        })
    }

    // Function to handle user clicking search by tasting and display SearchByTastingForm
    handleSearchReviewsByTasting = event => {
        event.preventDefault()
        this.setState({
            isSearchingByTasting: true,
            isSearching: false,
            viewSearchButton: false
        })
    }

    // Function to handle user clicking a tasting and display only reviews matching that tasting
    handleSearchByTasting = tasting => {
        this.setState({
            isSearchingByTasting: false,
            reviewsByTasting: this.state.reviews.filter(review => review.tastingSelection.tastingId === tasting),
            seeReviewsBySelectedTasting: true,
            viewSearchButton: true
        })
    }

    // Function to handle user clicking Edit review button
    handleEdit = event => {
        event.preventDefault()
        let reviewId = parseInt(event.target.id.split("-")[1])
        this.setState({
            isEditing: true,
            seeAllReviews: false,
            seeReviewsBySelectedWhiskey: false,
            seeReviewsBySelectedUser: false,
            seeReviewsBySelectedTasting: false,
            reviewToEdit: this.state.reviews.find(review => review.id === reviewId),
            editedReview: this.state.reviews.find(review => review.id === reviewId).review
        })
    }

    // Function to handle user clicking Save Review button
    handleSaveEdit = event => {
        event.preventDefault()
        const newState = {
            isEditing: false,
            seeAllReviews: true
        }
        ReviewManager.patch(event.target.id, {
            review: this.state.editedReview
        }).then(() => ReviewManager.getExpand())
            .then(reviews => (newState.reviews = reviews))
            .then(() => this.setState(newState))
    }

    // Function to handle user clicking Delete review button
    handleDelete = event => {
        event.preventDefault()
        if (window.confirm("Are you sure you want to delete this review?")) {
            let reviewId = parseInt(event.target.id.split("-")[1])
            const newState = {}
            ReviewManager.delete(reviewId)
                .then(() => ReviewManager.getExpand())
                .then(reviews => (newState.reviews = reviews))
                .then(() => this.setState(newState))
        }
    }

    // Function to handle user clicking cancel button
    handleCancel = event => {
        event.preventDefault()
        this.setState({
            isSearching: false,
            isEditing: false,
            viewSearchButton: true,
            seeAllReviews: true,
            seeReviewsBySelectedWhiskey: false,
            seeReviewsBySelectedUser: false,
            seeReviewsBySelectedTasting: false,
            isSearchingByTasting: false,
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
                            <ReviewSearchForm handleSearchAllReviews={this.handleSearchAllReviews} handleSearchReviewsByWhiskey={this.handleSearchReviewsByWhiskey} handleSearchReviewsByUser={this.handleSearchReviewsByUser} handleSearchReviewsByTasting={this.handleSearchReviewsByTasting} />
                        }
                        {this.state.seeAllReviews &&
                            this.state.reviews.map(review =>
                                <ReviewIndividualCard key={review.id} review={review}
                                    tastingSelections={this.state.tastingSelections} handleEdit={this.handleEdit} handleDelete={this.handleDelete} myFavorites={this.props.myFavorites} handleDeleteFavorite={this.props.handleDeleteFavorite} handleAddFavorite={this.props.handleAddFavorite} />
                            )
                        }
                        {this.state.isSearchingByWhiskey && <SearchReviewsByWhiskeyForm handleSearchByWhiskey={this.handleSearchByWhiskey} handleCancel={this.handleCancel} />
                        }
                        {this.state.seeReviewsBySelectedWhiskey && this.state.reviewsByWhiskey.length > 0 &&
                            this.state.reviewsByWhiskey.map(review =>
                                <ReviewIndividualCard key={review.id} review={review}
                                    tastingSelections={this.state.tastingSelections} handleEdit={this.handleEdit} handleDelete={this.handleDelete} myFavorites={this.props.myFavorites} handleDeleteFavorite={this.props.handleDeleteFavorite} handleAddFavorite={this.props.handleAddFavorite} />
                            )
                        }
                        {this.state.seeReviewsBySelectedWhiskey && this.state.reviewsByWhiskey.length === 0 &&
                            <Card>
                                <CardBody>
                                    <CardTitle>There are no reviews for this whiskey.</CardTitle>
                                </CardBody>
                            </Card>
                        }
                        {this.state.isSearchingByUser && <SearchReviewsByUserForm users={this.props.users} handleSearchByUser={this.handleSearchByUser}
                            handleCancel={this.handleCancel} />
                        }
                        {this.state.seeReviewsBySelectedUser && this.state.reviewsByUser.length > 0 && this.state.reviewsByUser.map(review => <ReviewIndividualCard key={review.id} review={review} tastingSelections={this.state.tastingSelections} handleEdit={this.handleEdit} handleDelete={this.handleDelete} myFavorites={this.props.myFavorites} handleDeleteFavorite={this.props.handleDeleteFavorite} handleAddFavorite={this.props.handleAddFavorite} />
                        )}
                        {this.state.seeReviewsBySelectedUser && this.state.reviewsByUser.length === 0 &&
                            <Card>
                                <CardBody>
                                    <CardTitle>This user has not reviewed any whiskies.</CardTitle>
                                </CardBody>
                            </Card>
                        }
                        {this.state.isSearchingByTasting && <SearchReviewsByTastingForm handleSearchByTasting={this.handleSearchByTasting} handleCancel={this.handleCancel} />
                        }
                        {this.state.seeReviewsBySelectedTasting && this.state.reviewsByTasting.length > 0 && this.state.reviewsByTasting.map(review => <ReviewIndividualCard key={review.id} review={review} tastingSelections={this.state.tastingSelections} handleEdit={this.handleEdit} handleDelete={this.handleDelete} myFavorites={this.props.myFavorites} handleDeleteFavorite={this.props.handleDeleteFavorite} handleAddFavorite={this.props.handleAddFavorite} />)
                        }
                        {this.state.seeReviewsBySelectedTasting && this.state.reviewsByTasting.length === 0 &&
                            <Card>
                                <CardBody>
                                    <CardTitle>There are no reviews for this tasting.</CardTitle>
                                </CardBody>
                            </Card>
                        }
                        {this.state.isEditing && <ReviewEditForm review={this.state.reviewToEdit}
                            tastingSelections={this.state.tastingSelections} editedReview={this.state.editedReview} handleFieldChange={this.handleFieldChange} handleCancel={this.handleCancel} handleSaveEdit={this.handleSaveEdit} />}
                    </CardBody>
                </Card>
            </React.Fragment>
        )
    }
}