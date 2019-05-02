// Passing tastingSelection as an argument (resource) into APIManager fetch calls

import APIManager from "./APIManager"

export default Object.create(APIManager, {
    resource: {
        value: "tastingSelections/?_expand=whiskey&_expand=tasting"
    }
})