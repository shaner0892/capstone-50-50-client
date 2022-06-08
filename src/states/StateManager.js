const API = 'http://localhost:8000'

export const getStates = () => {
    return fetch(`${API}/states`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then((res) => res.json())
}

export const getSingleState = (id) => {
    return fetch(`${API}/states/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then((res) => res.json())
}
