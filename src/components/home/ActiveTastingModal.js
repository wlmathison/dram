// Page builds card for active tasting to display on home page

import React, { Component } from "react"
import { Spinner, Card, CardHeader, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, FormGroup, Label, CardTitle } from "reactstrap"
import StarRatingComponent from 'react-star-rating-component'
import ReviewManager from "./../../modules/ReviewManager"
import RatingManager from "./../../modules/RatingManager"
import "./home.css"

export default class ActiveTastingModal extends Component {

    state = {
        modal: false
    }

    // Function to change state of rate-whiskeyId when user clicks on a star
    onStarClick = (nextValue, prevValue, name) => {
        const stateToChange = {}
        stateToChange[name] = nextValue
        this.setState(stateToChange)
    }

    // Function to toggle state of modal between false and true
    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    // Function to change state of editUser when button clicked
    handleFieldChange = event => {
        event.preventDefault()
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    // Function to handle user clicking Submit Tasting Form button and save ratings and reviews
    handleSubmitTastingForm = (ratingsArray, reviewsArray) => {
        let ratings = ratingsArray.filter(rating => this.state[rating] !== undefined)
        let reviews = reviewsArray.filter(review => this.state[review] !== undefined)

        ratings.map(rating =>
            RatingManager.post({
                userId: parseInt(sessionStorage.getItem("userId")),
                whiskeyId: parseInt(rating.split("-")[1]),
                rating: this.state[rating]
            })
        )

        reviews.forEach(review =>
            ReviewManager.post({
                userId: parseInt(sessionStorage.getItem("userId")),
                tastingSelectionId: parseInt(review.split("-")[1]),
                date: this.props.activeTasting.date,
                review: this.state[review]
            })
        )
        sessionStorage.setItem("tastingCompleted", true)
    }

    render() {
        let i = 0;
        const ratingsArray = []
        const reviewsArray = []
        return (
            <React.Fragment >
                <Card
                    className="card-first">
                    <CardHeader>
                        <div><Spinner type="grow" color="success" />Tasting in Progress
                    </div>
                        <Button
                            color="success"
                            onClick={this.toggle}
                        >Join Tasting
                            </Button></CardHeader>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>{this.props.activeTasting.date} Tasting
                            </ModalHeader>
                        <ModalBody>
                            {this.props.activeTasting.tastingSelections.map(selection => {
                                const name = `rate-${selection.whiskeyId}`;
                                ratingsArray.push(name)
                                const id = `review-${selection.id}-${selection.whiskeyId}`;
                                reviewsArray.push(id)
                                i++
                                let placeholder = `Review whiskey #${i} here`
                                return <CardBody key={selection.id}>
                                    <CardTitle>{i}.{" "}
                                        <StarRatingComponent
                                            required
                                            name={name}
                                            starCount={5}
                                            value={this.state[name]}
                                            onStarClick={this.onStarClick}
                                        />
                                    </CardTitle>
                                    <Form>
                                        <FormGroup>
                                            <Label>Review:</Label>
                                            <Input
                                                id={id}
                                                type="text"
                                                placeholder={placeholder}
                                                onChange={this.handleFieldChange}
                                            />
                                        </FormGroup>
                                    </Form>
                                </CardBody>
                            })}
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="success"
                                onClick={() => { this.handleSubmitTastingForm(ratingsArray, reviewsArray); this.props.pushResults() }}>
                                Submit Tasting Form
                                </Button>{' '}
                            <Button
                                color="secondary"
                                onClick={this.toggle}>
                                Cancel
                                </Button>
                        </ModalFooter>
                    </Modal>
                </Card>
            </React.Fragment >
        )
    }
}