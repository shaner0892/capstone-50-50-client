const API = 'http://localhost:8000'

export const getTrips = () => {
    return fetch(`${API}/trips`, {
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

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then((res) => res.json())
}