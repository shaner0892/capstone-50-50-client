const API = 'http://localhost:8000'

export const getUsers = () => {
    return fetch(`${API}/fiftyusers`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(res => res.json())
}

export const getCurrentUser = (id) => {
    return fetch(`${API}/fiftyusers/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(res => res.json())
}

export const putUser = (user) => {
    return fetch(`${API}/fiftyusers/${user.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
}