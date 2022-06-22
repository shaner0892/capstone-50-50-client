// will need a get pictures by trip
const API = 'http://localhost:8000'

export const getTripPictures = (tripId) => {
    return fetch(`${API}/trip_pictures?trip=${tripId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then((res) => res.json())
}

export const postTripPicture = (newPic) => {
    return fetch(`${API}/trip_pictures`, {
        method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("auth_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPic)
    })
}
