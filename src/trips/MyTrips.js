import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ReactStars from "react-rating-stars-component";
import { getMyTrips } from "./TripManager";


export const MyTrips = () => {
    //use the useState hook function to set the initial value of the user's trips array
    const [trips, setTrips] = useState([]);
    const history = useHistory()

    useEffect(
        () => {
            getMyTrips()
                .then(setTrips)
        },
        []
    )
    
    return (
        <>
        <h2>All of My Trips</h2>
        <section className="tripList">
        <button onClick={() => history.push("/add-trip")}>Add a New Trip</button>
        {/* <h3>Completed Trips</h3> */}
        {
            trips.map((trip) => {
                return <section className="trip" key={`trip--${trip.id}`}> 
                    <h3 onClick={() => history.push(`/trip-details/${trip.id}`)}><b>Trip #{trip.id}</b></h3> 
                    {/* <div>Who: {trip.fifty_user?.user?.username}</div> */}
                    <div><b>Where:</b> {trip.city}, {trip.state?.name} </div>
                    <div><b>What:</b> {trip.about} </div>
                    <div><b>When:</b> {trip.start_date} to {trip.end_date}</div>
                    <div><b>Activities:</b>
                    {
                        trip.activities?.map(a => <li>{a.title}</li>)
                    }
                    </div>
                    <div><b>Rating:</b>
                        <ReactStars 
                            count={5}
                            edit={false}
                            value={trip.rating}
                            size={24}
                            activeColor="#ffd700"
                        />
                    </div>
                </section>
            })
        }
        {/* <h3>Upcoming Trips</h3> */}
        </section>
        </>
    )
}
