import React, { useState, useEffect } from "react"
import ReactStars from "react-rating-stars-component";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "reactstrap";
import { getCategories, postTrip } from "./TripManager";
import { getStates } from "../states/StateManager";
import { getActivities } from "../activities/ActivityManager";
import { AddActivity } from "../activities/AddActivity";


export const AddTrip = () => {
    //use the useState hook function to set the initial value of the new object
    const [states, setStates] = useState([])
    const [categories, setCategories] = useState([])
    const [activities, setActivities] = useState([])
    const history = useHistory()
    const [tripActivities, setTripActivities] = useState([])
    const [rating, setRating] = useState({})
    const [category, setCategory] = useState("")
    const [state, setState] = useState("")

    // monitor state and category filters for changes
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

    //useState hook function sets the initial value of the trip to the defined properties, set function modifies the values
    const [trip, setTrip] = useState({
        state: 0,
        city: "",
        about: "",
        start_date: "",
        end_date: "",
        activity: [],
        rating: 0
    });
    
    //this updates the state as the user makes changes
    const updateTripState = (evt) => {
        const newTrip = Object.assign({}, trip)
        newTrip[evt.target.name] = evt.target.value
        setTrip(newTrip)
    }

    // this sets the rating; could not set evt.target.name to rating inside the stars component
    const ratingChanged = (newRating) => {
        setRating(newRating)
    }

    //each time the user hits "add" activity we push that activity into the tripActivities array
    const pushActivity = (evt) => {
        evt.preventDefault()
        // find the activity object that matches the selected one and assign it to a variable
        let selectedActivities = activities.filter(activity => parseInt(trip.activity) === activity.id)
        // unpacking: taking the activity you just added and adding it to the activities that were already saved
        setTripActivities([...selectedActivities, ...tripActivities])
    }

    // when the user hits submit POST the trip and route them to the add pictures page
    const addNewTrip = (evt) => {
        //capture the event and prevent the default (form submitted and reset) from happening
        evt.preventDefault()
        //object that we want to send to our API
        const newTrip = {
            state: trip.state,
            city: trip.city,
            about: trip.about,
            start_date: trip.start_date,
            end_date: trip.end_date,
            // by mapping through you change it to an array of IDs
            activity: tripActivities.map(tA => tA.id),
            rating: rating
        }
        // get the response from the POST so you can access the trip.id
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
                    <h5> Destination: </h5>
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
                    <h5 htmlFor="start_date">Start Date: </h5>
                    <input 
                        type="date" name="start_date" 
                        className="form-control"
                        onChange={updateTripState} />
                </div>
                <div className="form-group">
                    <h5 htmlFor="end_date">End Date: </h5>
                    <input required
                        type="date" name="end_date"
                        className="form-control"
                        onChange={updateTripState} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <h5 htmlFor="about">About: </h5>
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
                <h5> Add Your Activities: </h5><br></br>
                <div className="tAList">
                    {
                    tripActivities ? tripActivities.map((tA) => {
                        return <li>{tA.title}</li> }) : ""
                    }
                </div>
                <ol>
                    <li> Choose from Existing Activities: </li><br></br>
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
                    <Button className="btn" color="success" outline onClick={pushActivity} >Add Activity</Button><br></br>
                    <li> Create a New Activity: </li>
                    <AddActivity tripActivities={tripActivities} setTripActivities={setTripActivities} />
                </ol>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group" id="ratingSection">
                <h5 htmlFor="rating" id="ratingLabel">Rate Your Trip: </h5>
                    <div className="formStars">
                        <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={24}
                            activeColor="#ffd700"
                        />
                    </div>
                </div>
            </fieldset>
            <div>
                <Button className="btn" color="success" outline onClick={addNewTrip} >Next</Button>
            </div>
        </form>
    )
}
