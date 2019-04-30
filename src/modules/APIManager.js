// Creating generic fetch calls to pass along to other managers using prototypal inheritance

const remoterURL = "http://localhost:5002"

export default Object.create(null, {
    get: {
        value: function (resource, id) {
            return fetch(`${remoterURL}/${resource}/${id}`).then(results => results.json())
        }
    },
    getAll: {
        value: function (resource) {
            return fetch(`${remoterURL}/${resource}`).then(results => results.json())
        }
    },
    post: {
        value: function (resource, object) {
            return fetch(`${remoterURL}/${resource}`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(object)
            }).then(results => results.json())
        }
    },
    delete: {
        value: function (resource, id) {
            return fetch(`${remoterURL}/${resource}/${id}`, {
                method: "DELETE"
            }).then(results => results.json())
        }
    }
})
