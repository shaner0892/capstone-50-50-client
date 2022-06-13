import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deleteTrip, getMyTrips, getSingleTrip } from "./TripManager";


export const TripDetails = () => {
    //use the useState hook function to set the initial value of the new object
    const [trip, setTrip] = useState({});
    const history = useHistory()
    const {tripId} = useParams()

    useEffect(
        () => {
            getSingleTrip(tripId)
                .then(setTrip)
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
            <div>Who: {trip.fifty_user?.user?.username}</div>
            <div><b>Where:</b> {trip.city?.name}, {trip.state?.name} </div>
            <div><b>When:</b> {trip.start_date} to {trip.end_date}</div>
            <div><b>What:</b> {trip.about} </div>
            <div><b>Activities:</b>
            {
                trip.activities?.map(a => <li>{a.title}</li>)
            }
            </div>
            {/* display trip images */}
            <button onClick={() => history.push(`/edit-trip/${trip.id}`)}>Edit Trip</button>
            <button id="btn" onClick={() => {removeTrip(trip.id)}}> Delete Trip </button>
        </section>
        </>
    )
}
