// Creating generic fetch calls to pass along to other managers using prototypal inheritance

const remoteURL = "http://localhost:5002"

export default Object.create(null, {
    resource: {
        value: ""
    },
    get: {
        value: function (id) {
            return fetch(`${remoteURL}/${this.resource}/${id}`).then(results => results.json())
        }
    },
    getAll: {
        value: function () {
            return fetch(`${remoteURL}/${this.resource}`).then(results => results.json())
        }
    },
    post: {
        value: function (object) {
            return fetch(`${remoteURL}/${this.resource}`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(object)
            }).then(results => results.json())
        }
    },
    delete: {
        value: function (id) {
            return fetch(`${remoteURL}/${this.resource}/${id}`, {
                method: "DELETE"
            }).then(results => results.json())
        }
    }
})
