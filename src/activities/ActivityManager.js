const API = 'http://localhost:8000'

export const getActivities = (state, category, rating) => {
    let url = `${API}/activities?`
    if (state) {
        url += `state=${state}&`
    }
    if (category) {
        url += `category=${category}&`
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

export const getSingleActivity = (id) => {
    return fetch(`${API}/activities/${id}`, {
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

export const putActivity = (activity) => {
    return fetch(`${API}/activities/${activity.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(activity)
    })
}

export const deleteActivity = (activityId) => {
    return fetch(`${API}/activities/${activityId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`,
        }
    })
}