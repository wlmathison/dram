// Passing tastings as an argument (resource) into APIManager fetch calls

import APIManager from "./APIManager"

export default Object.create(APIManager, {
    resource: {
        value: "tastings"
    },
    expand: {
        value: "?_embed=tastingSelections&_embed=tastingAttendance"
    }
})