import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import ReactStars from "react-rating-stars-component";
import { getCategories } from "../trips/TripManager";
import { getActivities } from "./ActivityManager";
import { getStates } from "../states/StateManager";
import { getCurrentUser } from "../users/UserManager";
import "./Activity.css"


export const ActivityList = () => {
    //use the useState hook function to set the initial values
    const [activities, setActivities] = useState([])
    const history = useHistory()
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState("")
    const [states, setStates] = useState([])
    const [state, setState] = useState("")
    const [user, setUser] = useState({})
    const [rating, setRating] = useState(0)
    
    // monitor for changes to the filters
    useEffect(
        () => {
            getActivities(state, category, rating)
                .then(setActivities)
            getCategories()
                .then(setCategories)
            getStates()
                .then(setStates)
            getCurrentUser()
                .then(setUser)
        },
        [state, category, rating]
    )
    
    return (
        <>
        <h2>Browse All Activities</h2> 
        {/* if the logged in user is staff, allow them to add activities */}
        {
            user.user?.is_staff ? <Button color="success" outline className="rightBtn" onClick={() => history.push(`/add-activity`)}>Add Activity</Button> : ""
        }
        {/* add filters/sort by here; set the state from above onchange */}
        <section className="filter-section">
            <select className="filter-control" id="firstDrop" onChange={e => setCategory(parseInt(e.target.value))}>
                <option value="0" >Filter by Category</option>
                    {categories.map((category) => {
                        return <option value={category.id}>{category.name}</option>
                    })}
            </select> 
            <select className="filter-control" onChange={e => setState(parseInt(e.target.value))}>
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
        <section className="activityList">
        {/* display all approved activities here; show picture, title, and rating */}
        {
            activities.map((a) => {
                return <section className="activity" key={`activity--${a.id}`} onClick={() => history.push(`/activity-details/${a.id}`)}>
                    <img className="activityListPic" src={a.url}/>
                    <h5><b>{a.title}</b> </h5>
                        <div>
                            <ReactStars
                                className="stars"
                                count={5}
                                isHalf={true}
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
