import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ReactStars from "react-rating-stars-component";
import { getTrips } from "./TripManager";
import "./Trip.css"
import { getStates } from "../states/StateManager";


export const AllTrips = () => {
    //use the useState hook function to set the initial value of the trips array
    const [trips, setTrips] = useState([])
    const [states, setStates] = useState([])
    const [state, setState] = useState("")
    const history = useHistory()

    useEffect(
        () => {
            getTrips(state)
                .then(setTrips)
            getStates()
                .then(setStates)
        },
        [state]
    )
    
    return (
        <>
        <h2 className="pageHeader">All Trips</h2>
        <section className="tripList">
        <select className="form-control" onChange={e => setState(parseInt(e.target.value))}>
            <option value="0" >Filter by State</option>
                {states.map((state) => {
                    return <option value={state.id}>{state.name}</option>
                })}
        </select> 
        {
            trips.map((trip) => {
                return <section className="trip" key={`trip--${trip.id}`} onClick={() => history.push(`/trip-details/${trip.id}`)}> 
                <h3><b>Trip #{trip.id}</b></h3> 
                <div><b>Who:</b> {trip.fifty_user?.user?.username}</div>
                <div><b>Where:</b> {trip.city}, {trip.state?.postal_abbreviation} </div>
                {/* <div><b>What:</b> {trip.about} </div> */}
                <div><b>When:</b> {trip.start_date} to {trip.end_date}</div>
                {/* <div><b>Activities:</b>
                {
                    trip.activities?.map(a => <li>{a.title}</li>)
                }
                </div> */}
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
