// Passing tastingAttendance as an argument (resource) into APIManager fetch calls

import APIManager from "./APIManager"

export default Object.create(APIManager, {
    resource: {
        value: "tastingAttendance?_expand=user"
    }
})