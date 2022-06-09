import React, { useState, useEffect } from "react"
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getTrips } from "./TripManager";


export const AllTrips = () => {
    //use the useState hook function to set the initial value of the new object
    const [trips, setTrips] = useState([]);
    // const history = useHistory()

    useEffect(
        () => {
            getTrips()
                .then((trips) => {
                    setTrips(trips)
                })
        },
        []
    )
    
    return (
        <>
        {
            trips.map((trip) => {
                return <section className="trip" key={`trip--${trip.id}`}> 
                <div>Trip #{trip.id} </div> 
                <div>Who: {trip.fifty_user.username}</div>
                <div>Where: {trip.state} </div>
                <div>When: {trip.start_date} - {trip.end_date}</div>
            </section>
            })
        }
        </>
    )
}
