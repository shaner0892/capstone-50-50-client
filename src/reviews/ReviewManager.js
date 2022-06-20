const API = 'http://localhost:8000'

export const getReviews = (activityId) => {
    return fetch(`${API}/reviews?activity=${activityId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then((res) => res.json())
}

export const postReview = (newReview) => {
    return fetch(`${API}/reviews`, {
        method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("auth_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newReview)
    })
    .then((res) => res.json())
}