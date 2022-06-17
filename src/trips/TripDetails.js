import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ReactStars from "react-rating-stars-component";
import SimpleImageSlider from "react-simple-image-slider";
import { deleteTrip, getSingleTrip } from "./TripManager";
import { getTripPictures } from "../pictures/PictureManager";


export const TripDetails = () => {
    //use the useState hook function to set the initial value of the new object
    const [trip, setTrip] = useState({})
    const [tripPictures, setTripPictures] = useState([])

    const history = useHistory()
    const {tripId} = useParams()

    useEffect(
        () => {
            getSingleTrip(tripId)
                .then(setTrip)
            getTripPictures(tripId)
                .then(setTripPictures)
        },
        []
    )
    //define a function to delete a trip
    //invoke the DELETE method and then fetch the new list of trips
    const removeTrip = (id) => {
        deleteTrip(id)
            .then(()=> {
                history.push(`/my-trips`)
            })
    }
    
    return (
        <>
        <h2>Trip #{trip.id}</h2>
        <section className="trip" key={`trip--${trip.id}`}> 
            {/* {
                tripPictures ? tripPictures.map((tp) => {
                    return <img src={tp.url}/>}) : ""
            } */}
            { tripPictures.length > 0 ? <div>
                <SimpleImageSlider
                    width={896}
                    height={504}
                    images={tripPictures}
                    showBullets={true}
                    showNavs={true}
                />
                </div> : ""
            }
            <div><b>Who:</b> {trip.fifty_user?.user?.username}</div>
            <div><b>Where:</b> {trip.city}, {trip.state?.name} </div>
            <div><b>When:</b> {trip.start_date} to {trip.end_date}</div>
            <div><b>What:</b> {trip.about} </div>
            <div><b>Activities:</b>
            {
                trip.activities?.map(a => <li>{a.title}</li>)
            }
            </div>
            {/* display trip images */}
            {/* display trip rating with stars component */}
            <div><b>Rating:</b>
                <ReactStars 
                    count={5}
                    edit={false}
                    value={trip.rating}
                    size={24}
                    activeColor="#ffd700"
                />
            </div>
            <button onClick={() => history.push(`/edit-trip/${trip.id}`)}>Edit Trip</button>
            <button id="btn" onClick={() => {removeTrip(trip.id)}}> Delete Trip </button>
        </section>
        </>
    )
}
