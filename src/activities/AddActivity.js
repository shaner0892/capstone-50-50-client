import React, { useState, useEffect } from "react"
import { getCategories } from "../trips/TripManager";
import { getStates } from "../states/StateManager";
import { postActivity } from './ActivityManager';
import { getCurrentUser } from "../users/UserManager";


export const AddActivity = ({tripActivities, setTripActivities}) => {
    const [states, setStates] = useState([])
    const [categories, setCategories] = useState([])
    const [user, setUser] = useState({})
    
    useEffect(
        () => {
            getStates()
                .then(setStates)
            getCategories()
                .then(setCategories)
            getCurrentUser()
                .then(setUser)
        },
        []
    )

    //useState hook function sets the initial value of the activity to the defined properties, set is the function you invoke later on to modify the values
    const [activity, setActivity] = useState({
        title: "",
        state: 0,
        city: "",
        specific_location: "",
        category: 0,
        is_approved: false
    });

    // each time the user makes a change this updates state
    const updateActivity = (evt) => {
        const newActivity = Object.assign({}, activity)
        newActivity[evt.target.name] = evt.target.value
        setActivity(newActivity)
    }

    // when the user submits the activity this posts it and adds the activity to the tripActivities
    const addNewActivity = (evt) => {
        //capture the evt (event) and prevent the default (form submitted and reset) from happening
        evt.preventDefault()
        //object that we want to send to our API
        const newActivity = {
            title: activity.title,
            state: activity.state,
            city: activity.city,
            specific_location: activity.specific_location,
            category: activity.category,
            is_approved: activity.is_approved
        }

        postActivity(newActivity)
            .then((res) => {
                let copy = [...tripActivities]
                copy.push(res)
                setTripActivities(copy)
            })
    }

    // this clears the filters when the user hits submit by resetting the state
    const clearFilters = (evt) => {
        evt.preventDefault()
        setActivity({
            title: "",
            state: 0,
            city: "",
            specific_location: "",
            category: 0,
            is_approved: false
        })
    }

    //this will be the form you display, you need to capture user input and save to new object
    return (
        <>
        <form className="activityForm">
            <fieldset>
                <div className="form-group">
                    <label> Title: </label>
                    <input name="title" value={activity.title} className="form-control"
                        placeholder="Pint Night with my faves"
                        onChange={updateActivity}
                        /> 
                    </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label> Location: </label>
                    <input name="city" value={activity.city} className="form-control"
                        placeholder="City Name"
                        onChange={updateActivity}
                        /> 
                    <select name="state" value={activity.state} className="form-control"
                        onChange={updateActivity}
                        >
                        <option value="0">State</option>
                            {states.map((state) => {
                                return <option value={state.id}>{state.name}</option>
                            })}
                    </select> 
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label> Category: </label>
                    <select name="category" value={activity.category} className="form-control"
                        onChange={updateActivity}
                        >
                        <option value="0">Pick a Category</option>
                            {categories.map((category) => {
                                return <option value={category.id}>{category.name}</option>
                            })}
                    </select> 
                </div>
            </fieldset>
            {/* if the logged in user is staff they have the option to approve an activity so that it is a public option */}
            {
                user.user?.is_staff ? 
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="is_approved">Is this activity approved? </label>
                            <input neam="is_approved" type="checkbox" className="box" onChange={
                                    (evt) => {
                                        const copy = {...activity}
                                        copy.is_approved = evt.target.checked
                                        setActivity(copy)
                                    }
                                } />
                        </div>
                    </fieldset>
                : ""
            }
            <div>
                <button id="btn" outline className="btn btn-addActivity" onClick={(evt) => {
                    addNewActivity(evt) 
                    clearFilters(evt)
                }} >Add Activity</button>
            </div>
        </form>
        </>
    )
}
