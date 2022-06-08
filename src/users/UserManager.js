const API = 'http://localhost:8000'

export const getUsers = () => {
    return fetch(`${API}/users`)
        .then(res => res.json())
}

export const getCurrentUser = (id) => {
    return fetch(`${API}/users/${id}`)
        .then(res => res.json())
}