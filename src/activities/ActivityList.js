import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom";
import { getActivities } from "./ActivityManager";
import "./Activity.css"
import ReactStars from "react-rating-stars-component";
import { getCategories } from "../trips/TripManager";
import { getStates } from "../states/StateManager";


export const ActivityList = () => {
    //use the useState hook function to set the initial value of the new object
    const [activities, setActivities] = useState([])
    const [user, setUser] = useState({})
    const history = useHistory()
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState("")
    const [states, setStates] = useState([])
    const [state, setState] = useState("")

    
    useEffect(
        () => {
            getActivities(state, category)
                .then(setActivities)
            getCategories()
                .then(setCategories)
            getStates()
                .then(setStates)
            
        },
        [state, category]
    )
    
    return (
        <>
        <h2>Activity List</h2> 
        <button className="addActivityBtn" onClick={() => history.push(`/add-activity`)}>Add Activity</button>
        <select className="form-control" onChange={e => setCategory(parseInt(e.target.value))}>
            <option value="0" >Filter by Category</option>
                {categories.map((category) => {
                    return <option value={category.id}>{category.name}</option>
                })}
        </select> 
        <select className="form-control" onChange={e => setState(parseInt(e.target.value))}>
            <option value="0" >Filter by State</option>
                {states.map((state) => {
                    return <option value={state.id}>{state.name}</option>
                })}
        </select> 
        <section className="activityList">
        {
            activities.map((a) => {
                return <section className="activity" key={`activity--${a.id}`} onClick={() => history.push(`/activity-details/${a.id}`)}> 
                    <h4><b>{a.title}</b> </h4>
                        <div>Location: {a.city}, {a.state?.postal_abbreviation}</div>
                        <div>Category: {a.category?.name}</div>
                        <div>Average Rating: 
                            <ReactStars
                                className="stars"
                                count={5}
                                edit={false}
                                value={a.average_rating}
                                size={24}
                                activeColor="#ffd700"
                            />
                        </div>
                </section>})
        }
        </section>
        </>
    )
}
