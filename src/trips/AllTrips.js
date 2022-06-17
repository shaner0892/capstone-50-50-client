import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ReactStars from "react-rating-stars-component";
import { getTrips } from "./TripManager";


export const AllTrips = () => {
    //use the useState hook function to set the initial value of the trips array
    const [trips, setTrips] = useState([]);
    const history = useHistory()

    useEffect(
        () => {
            getTrips()
                .then(setTrips)
        },
        []
    )
    
    return (
        <>
        <h2>All Trips</h2>
        <section className="tripList">
        {
            trips.map((trip) => {
                return <section className="trip" key={`trip--${trip.id}`}> 
                <h3 onClick={() => history.push(`/trip-details/${trip.id}`)}><b>Trip #{trip.id}</b></h3> 
                <div><b>Who:</b> {trip.fifty_user?.user?.username}</div>
                <div><b>Where:</b> {trip.city}, {trip.state?.name} </div>
                <div><b>What:</b> {trip.about} </div>
                <div><b>When:</b> {trip.start_date} - {trip.end_date}</div>
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
        </section>
        </>
    )
}
