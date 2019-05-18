// Page renders the admin page showing admin functions including adding/editing/deleting resources as well as deactivating users

import React, { Component } from "react"
import CreateNewResource from "./CreateNewResource"
import EditResource from "./EditResource"
import DeleteResource from "./DeleteResource"
import ActivateDeactivateUser from "./ActivateDeactivateUser"
import ActivateUser from "./ActivateUser"
import DeactivateUser from "./DeactivateUser"
import CreateNewCategory from "./CreateNewCategory"
import CreateNewDistillery from "./CreateNewDistillery"
import CreateNewTasting from "./CreateNewTasting"
import CreateNewTastingSelection from "./CreateNewTastingSelection"
import CreateNewWhiskey from "./CreateNewWhiskey"
import DeleteCategory from "./DeleteCategory"
import DeleteDistillery from "./DeleteDistillery"
import DeleteTasting from "./DeleteTasting"
import DeleteTastingSelection from "./DeleteTastingSelection"
import DeleteWhiskey from "./DeleteWhiskey"
import EditDeleteCategory from "./EditDeleteCategory"
import EditDeleteDistillery from "./EditDeleteDistillery"
import UserManager from "./../../modules/UserManager"
import TastingManager from "./../../modules/TastingManager"
import WhiskeyManager from "./../../modules/WhiskeyManager"
import CategoryManager from "./../../modules/CategoryManager"
import DistilleryManager from "./../../modules/DistilleryManager"
import TastingSelectionManager from "./../../modules/TastingSelectionManager"
import "./admin.css"



export default class Admin extends Component {

    state = {
        categories: [],
        users: [],
        distilleries: [],
        tastings: [],
        tastingSelections: [],
        whiskies: [],
        showActivateDeactivate: true,
        showActivate: false,
        showDeactivate: false,
        showCreate: true,
        showEdit: true,
        showDelete: true,
        showCreateCategory: false,
        showCreateDistillery: false,
        showCreateTasting: false,
        showCreateTastingSelection: false,
        showCreateWhiskey: false,
        showDeleteCategory: false,
        showDeleteDistillery: false,
        showDeleteTasting: false,
        showDeleteTastingSelection: false,
        showDeleteWhiskey: false,
        showEditDeleteCategory: false,
        showEditDeleteDistillery: false
    }

    componentDidMount() {
        this.handleUpdateState()
    }

    // Function to call all managers and update state
    handleUpdateState = event => {
        const newState = {}
        UserManager.getAll()
            .then(users => (newState.users = users))
            .then(() => TastingManager.getAll())
            .then(tastings => (newState.tastings = tastings))
            .then(() => WhiskeyManager.getAll())
            .then(whiskies => (newState.whiskies = whiskies))
            .then(() => CategoryManager.getAll())
            .then(categories => (newState.categories = categories))
            .then(() => DistilleryManager.getAll())
            .then(distilleries => (newState.distilleries = distilleries))
            .then(() => TastingSelectionManager.getAll())
            .then(tastingSelections => (newState.tastingSelections = tastingSelections))
            .then(() => this.setState(newState))
    }

    // Function to change state of editUser when button clicked
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    // Function to handle user clicking cancel button and return to admin form
    handleCancel = event => {
        event.preventDefault()
        this.setState({
            showActivateDeactivate: true,
            showActivate: false,
            showDeactivate: false,
            showCreate: true,
            showEdit: true,
            showDelete: true,
            showCreateCategory: false,
            showCreateDistillery: false,
            showCreateTasting: false,
            showCreateTastingSelection: false,
            showCreateWhiskey: false,
            showDeleteCategory: false,
            showDeleteDistillery: false,
            showDeleteTasting: false,
            showDeleteTastingSelection: false,
            showDeleteWhiskey: false,
            showEditDeleteCategory: false,
            showEditDeleteDistillery: false
        })
    }

    // Function to handle refreshing admin page after user clicks a button
    handleRefresh = event => {
        this.setState({
            showActivateDeactivate: true,
            showActivate: false,
            showDeactivate: false,
            showCreate: true,
            showEdit: true,
            showDelete: true,
            showCreateCategory: false,
            showCreateDistillery: false,
            showCreateTasting: false,
            showCreateTastingSelection: false,
            showCreateWhiskey: false,
            showDeleteCategory: false,
            showDeleteDistillery: false,
            showDeleteTasting: false,
            showDeleteTastingSelection: false,
            showDeleteWhiskey: false,
            showEditDeleteCategory: false,
            showEditDeleteDistillery: false
        })
        this.handleUpdateState()
    }

    // Function to handle user clicking Activate User and display inactive user dropdown
    handleActivateUser = event => {
        event.preventDefault()
        this.setState({
            showActivate: true,
            showCreate: false,
            showActivateDeactivate: false,
            showEdit: false,
            showDelete: false,
        })
    }

    // Function to handle user clicking Deactivate User and display active user dropdown
    handleDeactivateUser = event => {
        event.preventDefault()
        this.setState({
            showDeactivate: true,
            showCreate: false,
            showActivateDeactivate: false,
            showEdit: false,
            showDelete: false,
        })
    }

    // Function to handle user selecting a user to activate, change isActive to true for the user in the database, and update state of users
    handleActivate = event => {
        event.preventDefault()
        const newState = {
            showActivateDeactivate: true,
            showCreate: true,
            showEdit: true,
            showDelete: true,
            showActivate: false
        }
        UserManager.patch(event.target.id, {
            isActive: true
        }).then(() => UserManager.getAll())
            .then(users => (newState.users = users))
            .then(() => this.setState(newState))
    }

    // Function to handle user selecting a user to deactivate, cahnge isActive to false for the user in the database, and update state of users
    handleDeactivate = event => {
        event.preventDefault()
        const newState = {
            showActivateDeactivate: true,
            showCreate: true,
            showEdit: true,
            showDelete: true,
            showDeactivate: false
        }
        UserManager.patch(event.target.id, {
            isActive: false
        }).then(() => UserManager.getAll())
            .then(users => (newState.users = users))
            .then(() => this.setState(newState))
    }

    // Function to handle user clicking Create New Category and display create category form
    handleCreateCategory = event => {
        event.preventDefault()
        this.setState({
            showCreateCategory: true,
            showCreate: false,
            showActivateDeactivate: false,
            showEdit: false,
            showDelete: false,
        })
    }

    // Function to handle user clicking Create New Distillery and display create distillery form
    handleCreateDistillery = event => {
        event.preventDefault()
        this.setState({
            showCreateDistillery: true,
            showCreate: false,
            showActivateDeactivate: false,
            showEdit: false,
            showDelete: false,
        })
    }

    // Function to handle user clicking Create New Tasting and display create tasting form
    handleCreateTasting = event => {
        event.preventDefault()
        this.setState({
            showCreateTasting: true,
            showCreate: false,
            showActivateDeactivate: false,
            showEdit: false,
            showDelete: false,
        })
    }

    // Function to handle user clicking Create New Tasting Selection and display create tasting selection form
    handleCreateTastingSelection = event => {
        event.preventDefault()
        this.setState({
            showCreateTastingSelection: true,
            showCreate: false,
            showActivateDeactivate: false,
            showEdit: false,
            showDelete: false,
        })
    }

    // Function to handle user clicking Create New Whiskey and display create whiskey form
    handleCreateWhiskey = event => {
        event.preventDefault()
        this.setState({
            showCreateWhiskey: true,
            showCreate: false,
            showActivateDeactivate: false,
            showEdit: false,
            showDelete: false,
        })
    }

    // Function to handle user clicking Delete Category and display delete category form
    handleDeleteCategory = event => {
        event.preventDefault()
        this.setState({
            showDeleteCategory: true,
            showCreate: false,
            showActivateDeactivate: false,
            showEdit: false,
            showDelete: false,
        })
    }

    // Function to handle user clicking Delete Distillery and display delete distillery form
    handleDeleteDistillery = event => {
        event.preventDefault()
        this.setState({
            showDeleteDistillery: true,
            showCreate: false,
            showActivateDeactivate: false,
            showEdit: false,
            showDelete: false,
        })
    }

    // Function to handle user clicking Delete Tasting and display delete tasting form
    handleDeleteTasting = event => {
        event.preventDefault()
        this.setState({
            showDeleteTasting: true,
            showCreate: false,
            showActivateDeactivate: false,
            showEdit: false,
            showDelete: false,
        })
    }

    // Function to handle user clicking Delete Tasting Selection and display delete tasting selection form
    handleDeleteTastingSelection = event => {
        event.preventDefault()
        this.setState({
            showDeleteTastingSelection: true,
            showCreate: false,
            showActivateDeactivate: false,
            showEdit: false,
            showDelete: false,
        })
    }

    // Function to handle user clicking Delete Whiskey and display delete whiskey form
    handleDeleteWhiskey = event => {
        event.preventDefault()
        this.setState({
            showDeleteWhiskey: true,
            showCreate: false,
            showActivateDeactivate: false,
            showEdit: false,
            showDelete: false,
        })
    }

    // Function to handle user clicking Edit/Delete Category and display edit/delete category form
    handleEditDeleteCategory = event => {
        event.preventDefault()
        this.setState({
            showEditDeleteCategory: true,
            showCreate: false,
            showActivateDeactivate: false,
            showEdit: false,
            showDelete: false,
        })
    }

    // Function to handle user clicking Edit/Delete Distillery and display edit/delete distillery form
    handleEditDeleteDistillery = event => {
        event.preventDefault()
        this.setState({
            showEditDeleteDistillery: true,
            showCreate: false,
            showActivateDeactivate: false,
            showEdit: false,
            showDelete: false,
        })
    }

    render() {
        return (
            <React.Fragment>
                {/* Below are multiple conditional rendering statements to display the imported file depending on the state(whish is listed first) */}
                {this.state.showActivateDeactivate && <ActivateDeactivateUser handleActivateUser={this.handleActivateUser} handleDeactivateUser={this.handleDeactivateUser} />
                }
                {this.state.showActivate && <ActivateUser handleCancel={this.handleCancel} users={this.state.users} handleActivate={this.handleActivate} />
                }
                {this.state.showDeactivate && <DeactivateUser handleCancel={this.handleCancel} users={this.state.users} handleDeactivate={this.handleDeactivate} />
                }
                {this.state.showCreate && <CreateNewResource handleCreateCategory={this.handleCreateCategory} handleCreateDistillery={this.handleCreateDistillery} handleCreateTasting={this.handleCreateTasting} handleCreateTastingSelection={this.handleCreateTastingSelection} handleCreateWhiskey={this.handleCreateWhiskey} />
                }
                {this.state.showCreateCategory && <CreateNewCategory handleCancel={this.handleCancel} handleRefresh={this.handleRefresh} />
                }
                {this.state.showCreateDistillery && <CreateNewDistillery handleCancel={this.handleCancel} handleRefresh={this.handleRefresh} />
                }
                {this.state.showCreateTasting && <CreateNewTasting handleCancel={this.handleCancel} handleRefresh={this.handleRefresh} />
                }
                {this.state.showCreateTastingSelection && <CreateNewTastingSelection handleCancel={this.handleCancel} handleRefresh={this.handleRefresh} tastings={this.state.tastings} whiskies={this.state.whiskies} />
                }
                {this.state.showCreateWhiskey && <CreateNewWhiskey handleCancel={this.handleCancel} handleRefresh={this.handleRefresh} whiskies={this.state.whiskies} categories={this.state.categories} distilleries={this.state.distilleries} />
                }
                {this.state.showEdit && <EditResource handleEditDeleteCategory={this.handleEditDeleteCategory} handleEditDeleteDistillery={this.handleEditDeleteDistillery} />
                }
                {this.state.showEditDeleteCategory && <EditDeleteCategory handleCancel={this.handleCancel} handleRefresh={this.handleRefresh} categories={this.state.categories} />
                }
                {this.state.showEditDeleteDistillery && <EditDeleteDistillery handleCancel={this.handleCancel} handleRefresh={this.handleRefresh} distilleries={this.state.distilleries} />
                }
                {this.state.showDelete && <DeleteResource handleDeleteCategory={this.handleDeleteCategory} handleDeleteDistillery={this.handleDeleteDistillery} handleDeleteTasting={this.handleDeleteTasting} handleDeleteTastingSelection={this.handleDeleteTastingSelection} handleDeleteWhiskey={this.handleDeleteWhiskey} />
                }
                {this.state.showDeleteCategory && <DeleteCategory handleCancel={this.handleCancel} handleRefresh={this.handleRefresh} categories={this.state.categories} />
                }
                {this.state.showDeleteDistillery && <DeleteDistillery handleCancel={this.handleCancel} handleRefresh={this.handleRefresh} distilleries={this.state.distilleries} />
                }
                {this.state.showDeleteTasting && <DeleteTasting handleCancel={this.handleCancel} handleRefresh={this.handleRefresh} tastings={this.state.tastings} />
                }
                {this.state.showDeleteTastingSelection && <DeleteTastingSelection handleCancel={this.handleCancel} handleRefresh={this.handleRefresh} tastingSelections={this.state.tastingSelections} tastings={this.state.tastings} whiskies={this.state.whiskies} />
                }
                {this.state.showDeleteWhiskey && <DeleteWhiskey handleCancel={this.handleCancel} handleRefresh={this.handleRefresh} whiskies={this.state.whiskies} />
                }
            </React.Fragment>
        )
    }
}