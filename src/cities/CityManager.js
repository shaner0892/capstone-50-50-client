const API = 'http://localhost:8000'

export const getCities = () => {
    return fetch(`${API}/cities`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then((res) => res.json())
}

export const getFilteredCities = (state) => {
    let url = "http://localhost:8000/cities?"
    if(state) {
        url+= `state=${state}&`
    }
    return fetch(url, {
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

export const postCity = (newCity) => {
    return fetch(`${API}/cities`, {
        method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("auth_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCity)
    })
    .then((res) => res.json())
}

export const putCity = (cityId, city) => {
    return fetch(`${API}/cities/${cityId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(city)
    })
}

export const deleteCity = (cityId) => {
    return fetch(`${API}/cities/${cityId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`,
        }
    })
}