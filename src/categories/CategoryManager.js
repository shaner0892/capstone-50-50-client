const API = 'http://localhost:8000'

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then((res) => res.json())
}

export const postCategory = (newCategory) => {
    return fetch(`${API}/categories`, {
        method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("auth_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCategory)
    })
    .then((res) => res.json())
}

export const deleteCategory = (categoryId) => {
    return fetch(`${API}/categories/${categoryId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`,
        }
    })
}