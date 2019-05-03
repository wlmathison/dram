// Passing tastingAttendance as an argument (resource) into APIManager fetch calls

import APIManager from "./APIManager"

export default Object.create(APIManager, {
    resource: {
        value: "tastingAttendance"
    },
    expand: {
        value: "?_expand=user"
    }
})