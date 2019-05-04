// Page builds card for active tasting to display on home page

import React, { Component } from "react"
import { Spinner, Card, CardHeader, CardBody, Button } from "reactstrap"

export default class JoinActiveTastingCard extends Component {
    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardHeader><Spinner type="grow" color="success" />Tasting in Progress</CardHeader>
                    <CardBody>
                        <Button
                            color="success">Join Tasting</Button>
                    </CardBody>
                </Card>
            </React.Fragment>
        )
    }
}