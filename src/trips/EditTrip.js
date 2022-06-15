import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getCategories, getSingleTrip, putTrip } from "./TripManager";
import { getStates } from "../states/StateManager";
import { deleteActivity, getActivities } from "../activities/ActivityManager";
import { AddActivity } from "../activities/AddActivity";
import { useParams } from "react-router-dom";
// import Popup from "../components/Popup";

export const EditTrip = () => {
    //use the useState hook function to set the initial value of the new object
    const [states, setStates] = useState([])
    const [categories, setCategories] = useState([])
    const [activities, setActivities] = useState([])
    const history = useHistory()
    const [tripActivities, setTripActivities] = useState([])    
    const [trip, setTrip] = useState({})
    const {tripId} = useParams()
    // const [buttonPopup, setButtonPopup] = useState(false)

    useEffect(
        () => {
            getStates()
                .then(setStates)
            getCategories()
                .then(setCategories)
            getActivities()
                .then(setActivities)
            getSingleTrip(tripId)
                .then((res) => {
                    res.state=res.state.id
                    setTripActivities(res.activities)
                    setTrip(res)})
        },
        []
    )

    // const updateTripState = (evt) => {
    //     const editedTrip = Object.assign({}, trip)
    //     if (evt.target.name === "activity"){
    //         editedTrip[evt.target.name].push(parseInt(evt.target.value))
    //     } else {
    //         editedTrip[evt.target.name] = evt.target.value
    //     }
    //     setTrip(editedTrip)
    // }

    //this updates the state as the user makes changes
    //if they add an activity the id is pushed into the trip.activity array
    const updateTripState = (evt) => {
        const newTrip = Object.assign({}, trip)
        newTrip[evt.target.name] = evt.target.value
        setTrip(newTrip)
    }

    //each time the user hits "add" activity we are adding the selected activity to display
    const pushActivity = (evt) => {
        evt.preventDefault()
        let selectedActivities = activities.filter(activity => parseInt(trip.activity) === activity.id)
        // unpacking: taking the activity you just added and adding it to the activities that were already saved
        setTripActivities([...selectedActivities, ...tripActivities])
    }

    // this puts the new activity when the user hits submit
    const editTrip = (evt) => {
        //capture the evt (event) and prevent the default (form submitted and reset) from happening
        evt.preventDefault()
        //object that we want to send to our API
        const editedTrip = {
            state: trip.state,
            city: trip.city,
            about: trip.about,
            start_date: trip.start_date,
            end_date: trip.end_date,
            completed: trip.completed,
            // by mapping through you change it to an array of IDs
            activity: tripActivities.map(tA => tA.id)
            // rating: trip.rating
        }

        putTrip(tripId, editedTrip)
            .then(() => history.push(`/my-trips`))
    }

    //define a function to delete a activity
    //invoke the DELETE method and then fetch the new list of activities
    const removeActivity = (evt, id) => {
        evt.preventDefault()
        deleteActivity(id)
            .then(()=> {
                getSingleTrip(tripId)
                    .then(setTrip)
            })
    }
    
    //this will be the edit form you display, you need to capture user input and save to new object
    return (
        <form className="tripForm">
            <h2 className="tripForm__title">Edit Your Trip</h2>
            <fieldset>
                <div className="form-group">
                    <label> Destination: </label>
                    <input name="city" className="form-control" value={trip.city}
                        onChange={updateTripState}/> 
                    <select name="state" className="form-control" value={trip.state}
                    // need to add onChange={e => setState(e.target.value)}
                    onChange={updateTripState}>
                        <option value="0">State</option>
                            {states.map((state) => {
                                return <option value={state.id}>{state.name}</option>
                            })}
                    </select> 
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="start_date">Start Date: </label>
                    <input value={trip.start_date}
                        type="date" name="start_date"
                        className="form-control"
                        onChange={updateTripState} />
                </div>
                <div className="form-group">
                    <label htmlFor="end_date">End Date: </label>
                    <input value={trip.end_date}
                        type="date" name="end_date"
                        className="form-control"
                        onChange={updateTripState} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="about">About: </label>
                    <textarea id="form-about" cols="40" rows="5" value={trip.about}
                        type="text" name="about"
                        className="form-control"
                        onChange={updateTripState} >
                    </textarea>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label> Your Activities: </label><br></br>
                {
                    tripActivities ? tripActivities.map((tA) => {
                        return <section><li>{tA.title}</li> 
                        <button onClick={() => history.push(`/edit-activity/${tA.id}`)}>Edit Activity</button>
                        {/* <button onClick={() => setButtonPopup(true)}>Edit Activity</button>
                        <Popup trigger={buttonPopup}>
                            <h3>Popup window</h3>
                        </Popup> */}
                        <button id="btn" onClick={(evt) => {removeActivity(evt, tA.id)}}> Delete Activity </button>
                        </section>}) : ""
                }
                <label> Add to Your Activities: </label><br></br>
                    <label> Choose from Existing Activities: </label><br></br>
                    <select name="category" className="form-control">
                        <option value="0">Filter by Category</option>
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
                    <button id="btn" outline className="btn btn-addActivity" onClick={pushActivity} >Add</button><br></br>
                    <label> Or Create a New Activity: </label>
                    <AddActivity tripActivities={tripActivities} setTripActivities={setTripActivities} />
                    {/* <button id="btn" outline className="btn btn-addActivity" onClick={addActivity} >Add a New Activity</button> */}
                </div>
            </fieldset>
            {/* do I need a completed section? Should I just determine this by the end date and nix it? The idea was a trip may have been cancelled */}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="completed">Have you already completed this trip? </label>
                    <input type="checkbox"
                        className="box"
                        onChange={updateTripState}/>
                </div>
            </fieldset>
            {/* add a rating feature if the trip has been completed */}
            {/* <fieldset>
                <div className="form-group">
                <UploadImages obj={dog} update={updateDog} />
                </div>
            </fieldset> */}
            <div>
                <button id="btn" outline className="btn btn-addTrip" onClick={editTrip} >Submit</button>
            </div>
        </form>
    )
}
