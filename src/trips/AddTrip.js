import React, { useState, useEffect } from "react"
import ReactStars from "react-rating-stars-component";
import { render } from "react-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getCategories, postTrip } from "./TripManager";
import { getStates } from "../states/StateManager";
import { getActivities } from "../activities/ActivityManager";
import { AddActivity } from "../activities/AddActivity";
// import UploadImages from "../pictures/PhotoUpload";


export const AddTrip = () => {
    //use the useState hook function to set the initial value of the new object
    const [states, setStates] = useState([])
    const [categories, setCategories] = useState([])
    const [activities, setActivities] = useState([])
    const history = useHistory()
    const [tripActivities, setTripActivities] = useState([])
    // const [tripPictures, setTripPictures] = useState([])
    const [rating, setRating] = useState({})
    const [category, setCategory] = useState("")
    const [state, setState] = useState("")

    useEffect(
        () => {
            getStates()
                .then(setStates)
            getCategories()
                .then(setCategories)
            getActivities(state, category)
                .then(setActivities)
        },
        [state, category]
    )

    //useState hook function sets the initial value of dog to the defined properties, updateDog is a function you invoke later on to modify the values
    const [trip, setTrip] = useState({
        state: 0,
        city: "",
        about: "",
        start_date: "",
        end_date: "",
        completed: false,
        activity: [],
        rating: 0
    });
    
    //this updates the state as the user makes changes
    //if they add an activity the id is pushed into the trip.activity array
    const updateTripState = (evt) => {
        const newTrip = Object.assign({}, trip)
        newTrip[evt.target.name] = evt.target.value
        setTrip(newTrip)
    }

    const ratingChanged = (newRating) => {
        setRating(newRating)
    }
    //each time the user hits "add" activity we are adding the selected activity to display
    const pushActivity = (evt) => {
        evt.preventDefault()
        let selectedActivities = activities.filter(activity => parseInt(trip.activity) === activity.id)
        // unpacking: taking the activity you just added and adding it to the activities that were already saved
        setTripActivities([...selectedActivities, ...tripActivities])
    }

    // this posts the new activity when the user hits submit
    const addNewTrip = (evt) => {
        //capture the evt (event) and prevent the default (form submitted and reset) from happening
        evt.preventDefault()
        //object that we want to send to our API
        const newTrip = {
            state: trip.state,
            city: trip.city,
            about: trip.about,
            start_date: trip.start_date,
            end_date: trip.end_date,
            completed: trip.completed,
            // by mapping through you change it to an array of IDs
            activity: tripActivities.map(tA => tA.id),
            // need to capture rating
            rating: rating
        }

        // ******this push doesn't work, the ID hasn't been created yet
        postTrip(newTrip)
            .then((res) => res.json())
            .then((res) => history.push(`/add-pictures/${res.id}`))
    }
    
    //this will be the form you display, you need to capture user input and save to new object
    return (
        <form className="tripForm">
            <h2 className="tripForm__title">Add a Trip</h2>
            <fieldset>
                <div className="form-group">
                    <h4> Destination: </h4>
                    <input name="city" className="form-control"
                        placeholder="City Name"
                        onChange={updateTripState}
                        /> 
                    <select name="state" className="form-control" 
                        // each time the user changes the state selection, filter the activities
                        onChange={(evt) => {
                            updateTripState(evt)
                            setState(parseInt(evt.target.value))}}>
                        <option value="0">State</option>
                            {states.map((state) => {
                                return <option value={state.id}>{state.name}</option>
                            })}
                    </select> 
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <h4 htmlFor="start_date">Start Date: </h4>
                    <input 
                        type="date" name="start_date" 
                        className="form-control"
                        onChange={updateTripState} />
                </div>
                <div className="form-group">
                    <h4 htmlFor="end_date">End Date: </h4>
                    <input required
                        type="date" name="end_date"
                        className="form-control"
                        onChange={updateTripState} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <h4 htmlFor="about">About: </h4>
                    <textarea id="form-about" cols="40" rows="5"
                        type="text" name="about" 
                        className="form-control"
                        placeholder="Tell us about your trip"
                        onChange={updateTripState} >
                    </textarea>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <h4> Add Your Activities: </h4><br></br>
                {
                    tripActivities ? tripActivities.map((tA) => {
                        return <li>{tA.title}</li> }) : ""
                }
                    <label> Choose from Existing Activities: </label><br></br>
                    {/* each time the user changes the category, filter the activities */}
                    <select className="form-control" onChange={e => setCategory(parseInt(e.target.value))}>
                        <option value="0" >Filter by Category</option>
                            {categories.map((category) => {
                                return <option value={category.id}>{category.name}</option>
                            })}
                    </select> 
                    <select name="activity" className="form-control"
                        onChange={updateTripState}>
                        <option value="0">Activity</option>
                            {activities.map((activity) => {
                                return <option value={activity.id}>{activity.title}</option>
                            })}
                    </select> <br></br>
                    <button id="btn" outline className="btn btn-addActivity" onClick={pushActivity} >Add Activity</button><br></br>
                    <label> Or Create a New Activity: </label>
                    <AddActivity tripActivities={tripActivities} setTripActivities={setTripActivities} />
                    {/* <button id="btn" outline className="btn btn-addActivity" onClick={addActivity} >Add a New Activity</button> */}
                </div>
            </fieldset>
            {/* do I need a completed section? Should I just determine this by the end date and nix it? The idea was a trip may have been cancelled */}
            <fieldset>
                <div className="form-group">
                    <h4 htmlFor="completed">Have you already completed this trip? </h4>
                    <input neam="completed" type="checkbox" className="box" onChange={
                            (evt) => {
                                const copy = {...trip}
                                copy.completed = evt.target.checked
                                setTrip(copy)
                            }
                        } />
                </div>
            </fieldset>
            {/* add a rating feature if the trip has been completed */}
            <fieldset>
                <div className="form-group">
                <h4 htmlFor="rating">Rate Your Trip: </h4>
                    <ReactStars 
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        activeColor="#ffd700"
                        />
                </div>
            </fieldset>
            {/* <fieldset>
                <div className="form-group">
                    <UploadImages obj={tripPictures} update={setTripPictures} />
                </div>
            </fieldset> */}
            <div>
                <button id="btn" outline className="btn btn-addTrip" onClick={addNewTrip} >Next</button>
            </div>
        </form>
    )
}
