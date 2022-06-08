const API = 'http://localhost:8000'

export const getCities = () => {
    return fetch(`${API}/cities`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then((res) => res.json())
}

export const getSingleCity = (id) => {
    return fetch(`${API}/cities/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then((res) => res.json())
}
