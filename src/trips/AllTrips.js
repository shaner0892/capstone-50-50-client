import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ReactStars from "react-rating-stars-component";
import { getTrips } from "./TripManager";
import { getStates } from "../states/StateManager";
import "./Trip.css"


export const AllTrips = () => {
    //use the useState hook function to set the initial value of the trips array
    const [trips, setTrips] = useState([])
    const [states, setStates] = useState([])
    const [state, setState] = useState("")
    const [rating, setRating] = useState(0)
    const history = useHistory()
    
    useEffect(
        () => {
            getTrips(state, rating)
                .then(setTrips)
            getStates()
                .then(setStates)
        },
        [state, rating]
    )
    
    return (
        <>
        <h2 className="pageHeader">Browse All Trips</h2>
        <section className="filter-section">
            <select className="filter-control" id="firstDrop" onChange={e => setState(parseInt(e.target.value))}>
                <option value="0" >Filter by State</option>
                    {states.map((state) => {
                        return <option value={state.id}>{state.name}</option>
                    })}
            </select> 
            <select className="filter-control" onChange={e => setRating(parseInt(e.target.value))}>
                <option value="0" >Sort By</option>
                    <option value={1}>Rating</option>
            </select> 
        </section>
        <section className="tripList">
        {
            trips.map((trip) => {
                return <section className="trip" key={`trip--${trip.id}`} onClick={() => history.push(`/trip-details/${trip.id}`)}> 
                <h5><b>Trip to {trip.city}, {trip.state?.postal_abbreviation}</b></h5> 
                {/* <div><b>Where:</b> {trip.city}, {trip.state?.postal_abbreviation} </div> */}
                <div>{trip.about} </div>
                {/* <div><b>When:</b> {trip.start_date} to {trip.end_date}</div> */}
                <div><b>By:</b> {trip.fifty_user?.user?.username}</div>
                {/* <div><b>Activities:</b>
                {
                    trip.activities?.map(a => <li>{a.title}</li>)
                }
                </div> */}
                <div>
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
