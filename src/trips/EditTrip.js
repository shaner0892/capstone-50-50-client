import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { Button } from "reactstrap";
import { getCategories, getSingleTrip, putTrip } from "./TripManager";
import { getStates } from "../states/StateManager";
import { deleteActivity, getActivities } from "../activities/ActivityManager";
import { AddActivity } from "../activities/AddActivity";
// import Popup from "../components/Popup";


export const EditTrip = () => {
    //use the useState hook function to set the initial values
    const history = useHistory()
    const [states, setStates] = useState([])
    const [categories, setCategories] = useState([])
    const [activities, setActivities] = useState([])
    const [tripActivities, setTripActivities] = useState([])    
    const [trip, setTrip] = useState({})
    const {tripId} = useParams()
    // const [buttonPopup, setButtonPopup] = useState(false)
    const [tripRefresh, setTripRefresh] = useState(false)
    const [rating, setRating] = useState(0)
    const [category, setCategory] = useState("")
    const [state, setState] = useState("")


    // monitor for changes to state and category for filtering activities
    useEffect(
        () => {
            getStates()
                .then(setStates)
            getCategories()
                .then(setCategories)
            getActivities(state, category)
                .then(setActivities)
        },
        [tripRefresh, state, category]
    )

    // separate useEffect that doesn't update every change
    useEffect(
        () => {
            getSingleTrip(tripId)
                .then((res) => {
                    setRating(res.rating)
                    res.state=res.state.id
                    setTripActivities(res.activities)
                    setTrip(res)})
        },
        []
    )

    //this updates the state as the user makes changes
    const updateTripState = (evt) => {
        const editedTrip = Object.assign({}, trip)
        if (evt.target.name === "state"){
            editedTrip["state"] = parseInt(evt.target.value)
        }else {
            editedTrip[evt.target.name] = evt.target.value
        }
        setTrip(editedTrip)
    }

    // this sets the rating; could not set evt.target.name to rating inside the stars component
    const ratingChanged = (editedRating) => {
        setRating(editedRating)
    }

    //each time the user hits "add" activity we push that activity into the tripActivities array
    const pushActivity = (evt) => {
        evt.preventDefault()
        // find the activity object that matches the selected one and assign it to a variable
        let selectedActivities = activities.filter(activity => parseInt(trip.activity) === activity.id)
        // unpacking: taking the activity you just added and adding it to the activities that were already saved
        setTripActivities([...selectedActivities, ...tripActivities])
    }

    // when the user hits submit PUT the trip and route them to the add pictures page
    const editTrip = (evt) => {
        //capture the event and prevent the default (form submitted and reset) from happening
        evt.preventDefault()
        //object that we want to send to our API
        const editedTrip = {
            state: trip.state,
            city: trip.city,
            about: trip.about,
            start_date: trip.start_date,
            end_date: trip.end_date,
            // by mapping through you change it to an array of IDs
            activity: tripActivities.map(tA => tA.id),
            rating: rating
        }
        putTrip(tripId, editedTrip)
            .then(() => history.push(`/add-pictures/${tripId}`))
    }

    //invoke the DELETE method and then fetch the new list of activities
    const removeActivity = (evt, id) => {
        evt.preventDefault()
        deleteActivity(id)
            .then(()=> {
                getSingleTrip(tripId)
                    .then((res) => {
                        res.state=res.state.id
                        setTripActivities(res.activities)
                        setTrip(res)})
            })
    }
    
    //this will be the edit form you display, you need to capture user input and save to new object
    return (
        <>
        <form className="tripForm">
            <h2 className="tripForm__title">Edit Your Trip</h2>
            <fieldset>
                <div className="form-group">
                    <h5> Destination: </h5>
                    <input name="city" className="form-control" value={trip.city}
                        onChange={updateTripState}/> 
                    <select name="state" className="form-control"
                    // each time the user changes the state selection, filter the activities
                    onChange={(evt) => {
                        updateTripState(evt)
                        setState(parseInt(evt.target.value))}}>
                        <option value="0">State</option>
                        {/* add if else to check which state was selected */}
                            {states.map((state)=> {
                                if (trip.state === state.id) {
                                    return <option value={state.id} selected>{state.name}</option>
                                } else {
                                    return <option value={state.id} >{state.name}</option>
                                }
                            })}
                    </select> 
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <h5 htmlFor="start_date">Start Date: </h5>
                    <input value={trip.start_date}
                        type="date" name="start_date"
                        className="form-control"
                        onChange={updateTripState} />
                </div>
                <div className="form-group">
                    <h5 htmlFor="end_date">End Date: </h5>
                    <input value={trip.end_date}
                        type="date" name="end_date"
                        className="form-control"
                        onChange={updateTripState} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <h5 htmlFor="about">About: </h5>
                    <textarea id="form-about" cols="40" rows="10" value={trip.about}
                        type="text" name="about"
                        className="form-control"
                        onChange={updateTripState} >
                    </textarea>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <h5> Your Activities: </h5><br></br>
                    <ol>
                    {
                        tripActivities ? tripActivities.map((tA) => {
                            return <section><li>{tA.title}</li> 
                        {/* edit button that opens a pop up window
                        send in the id of the activity chosen 
                        send in tripRefresh so you have the ability to update the form changes */}
                        {/* add a ternary so that only unapproved activities can be edited */}
                        {/* {
                            tA.is_approved ? "" : <div><Button className="btn" color="success" outline id={tA.id} onClick={(e) => {
                                e.preventDefault()
                                setButtonPopup(e.target.id)}}>Edit Activity</Button>
                                <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                                    <EditActivity activityId={buttonPopup} setButtonPopUp={setButtonPopup} tripRefresh={tripRefresh} setTripRefresh={setTripRefresh} />
                                </Popup></div>
                        } */}
                            <Button className="btn" color="success" outline onClick={(evt) => {removeActivity(evt, tA.id)}}> Delete Activity </Button>
                            </section>}) : ""
                    }</ol>
                    <label> Add to Your Activities: </label><br></br>
                        <li> Choose from Existing Activities: </li><br></br>
                        <select name="category" className="form-control" onChange={evt => setCategory(parseInt(evt.target.value))}>
                            <option value="0">Filter by Category</option>
                                {categories.map((category) => {
                                    return <option value={category.id}>{category.name}</option>
                                })}
                        </select> 
                        <select name="activity" className="form-control" onChange={updateTripState}>
                            <option value="0">Activity</option>
                                {activities.map((activity) => {
                                    return <option value={activity.id}>{activity.title}</option>
                                })}
                        </select> <br></br>
                        <Button className="btn" color="success" outline onClick={pushActivity} >Add Activity</Button><br></br>
                        <li> Or Create a New Activity: </li>
                        <AddActivity tripActivities={tripActivities} setTripActivities={setTripActivities} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group" id="ratingSection">
                <h5 htmlFor="rating" id="ratingLabel">Rate Your Trip: </h5>
                    <div className="formStars">
                        {/* on intial load it doesn't have a rating, this makes it wait */}
                        {trip.rating != undefined && 
                        <ReactStars 
                            count={5}
                            value={trip.rating}
                            edit={true}
                            size={24}
                            activeColor="#ffd700"
                            onChange={ratingChanged}
                        />}
                    </div>
                </div>
            </fieldset>
            <div>
                <Button id="btn" color="success" outline onClick={editTrip} >Next</Button>
            </div>
        </form>
        </>
    )
}
