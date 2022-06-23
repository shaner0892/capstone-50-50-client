import React, { useState, useEffect } from "react"
import { Button } from "reactstrap";
import { getCategories } from "../trips/TripManager";
import { getStates } from "../states/StateManager";
import { getSingleActivity, putActivity } from './ActivityManager';
import { getCurrentUser } from "../users/UserManager";

// this is the edit page you invoke when editing from the trip form (using the pop up window)

export const EditActivity = ({activityId, setButtonPopUp, tripRefresh, setTripRefresh}) => {

    //use the useState hook function to set the initial values
    const [states, setStates] = useState([])
    const [categories, setCategories] = useState([])
    const [activity, setActivity] = useState({})
    const [user, setUser] = useState({})
    
    // set state and category to the id only so you don't pass in the whole object
    useEffect(
        () => {
            getSingleActivity(activityId)
                .then((res) => {
                    res.state = res.state.id
                    res.category = res.category.id
                    setActivity(res)})
            getStates()
                .then(setStates)
            getCategories()
                .then(setCategories)
            getCurrentUser()
                .then(setUser)
        },
        []
    )

    // each time the user makes a change this updates state
    const updateActivity = (evt) => {
        const editedActivity = Object.assign({}, activity)
        editedActivity[evt.target.name] = evt.target.value
        setActivity(editedActivity)
    }

    // when the user saves the activity this PUTs it and adds the activity to the tripActivities
    const saveEditedActivity = (evt) => {
        //capture the event and prevent the default (form submitted and reset) from happening
        evt.preventDefault()
        //object that we want to send to our API
        const editedActivity = {
            id: activity.id,
            title: activity.title,
            state: activity.state,
            city: activity.city,
            specific_location: activity.specific_location,
            category: activity.category,
            is_approved: activity.is_approved,
            url: activity.url
        }
        // bangtripRefresh toggles the set to true or false
        // setButtonPop(false) closes the popup window
        putActivity(editedActivity)
            .then(() => {
                setTripRefresh(!tripRefresh)
                setButtonPopUp(false)
            })
    }
    
    //this will be the form you display, you need to capture user input and update the object
    return (
        <>
        <form className="activityForm">
            <fieldset>
                <div className="form-group">
                    <label> Title: </label>
                    <input name="title" className="form-control" value={activity.title}
                        onChange={updateActivity}
                        /> 
                    </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label> Location: </label>
                    <input name="city" className="form-control" value={activity.city}
                        onChange={updateActivity}
                        /> 
                    <select name="state" className="form-control" value={activity.state}
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
                    <select name="category" className="form-control" value={activity.category}
                        onChange={updateActivity}
                        >
                        <option value="0">Pick a Category</option>
                            {categories.map((category) => {
                                return <option value={category.id}>{category.name}</option>
                            })}
                    </select> 
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label> Image URL: </label>
                    <img className="activityPic" src={activity.url}/>
                    <input name="url" className="form-control" value={activity.url}
                        onChange={updateActivity}
                        /> 
                    </div>
            </fieldset>
            {/* if the logged in user is staff they have the option to approve an activity so that it is a public option */}
            {
                user.user?.is_staff ? 
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="is_approved">Is this activity approved? </label>
                            <input name="is_approved" checked={activity.is_approved ? "checked" : ""} type="checkbox" className="box" onChange={
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
                <Button id="btn" color="success" outline className="btn btn-editActivity" onClick={saveEditedActivity} >Save</Button>
            </div>
        </form>
        </>
    )
}
