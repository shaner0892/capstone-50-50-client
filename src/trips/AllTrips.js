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
                .then(setTrips)
        },
        []
    )
    
    return (
        <>
        {
            trips.map((trip) => {
                return <section className="trip" key={`trip--${trip.id}`}> 
                <div><b>Trip #{trip.id}</b> </div> 
                <div><b>Who:</b> {trip.fifty_user?.user?.username}</div>
                <div><b>Where:</b> {trip.city}, {trip.state?.name} </div>
                <div><b>When:</b> {trip.start_date} - {trip.end_date}</div>
                <div><b>Activities:</b>
                    {
                        trip.activities?.map(a => <li>{a.title}</li>)
                    }
                    </div>
            </section>
            })
        }
        </>
    )
}
