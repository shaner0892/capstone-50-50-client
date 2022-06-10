const API = 'http://localhost:8000'

export const getActivities = () => {
    return fetch(`${API}/activities`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then((res) => res.json())
}

export const postActivity = (newActivity) => {
    return fetch(`${API}/activities`, {
        method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("auth_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newActivity)
    })
    .then((res) => res.json())
}