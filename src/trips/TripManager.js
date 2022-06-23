const API = 'http://localhost:8000'

export const getTrips = (state, rating) => {
    let url = `${API}/trips?`
    if (state) {
        url += `state=${state}&`
    }
    if (rating) {
        url += `rating=${rating}&`
    }
    return fetch(url, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then((res) => res.json())
}

export const getMyTrips = (state, rating) => {
    let url = `${API}/trips/my_trips?`
    if (state) {
        url += `state=${state}&`
    }
    if (rating) {
        url += `rating=${rating}&`
    }
    return fetch(url, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then((res) => res.json())
}

export const getSingleTrip = (id) => {
    return fetch(`${API}/trips/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then((res) => res.json())
}

export const postTrip = (newTrip) => {
    return fetch(`${API}/trips`, {
        method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("auth_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTrip)
    })
}

export const putTrip = (tripId, trip) => {
    return fetch(`${API}/trips/${tripId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(trip)
    })
}

export const deleteTrip = (tripId) => {
    return fetch(`${API}/trips/${tripId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`,
        }
    })
}

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then((res) => res.json())
}