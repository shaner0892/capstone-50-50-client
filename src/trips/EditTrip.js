import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getCategories, getSingleTrip, postTrip, putTrip } from "./TripManager";
// import { getCurrentUser } from "../users/UserManager";
import { getStates } from "../states/StateManager";
import { getCities } from "../cities/CityManager";
import { getActivities } from "../activities/ActivityManager";
import { AddActivity } from "../activities/AddActivity";
import { useParams } from "react-router-dom";


export const EditTrip = () => {
    //use the useState hook function to set the initial value of the new object
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])
    const [categories, setCategories] = useState([])
    const [activities, setActivities] = useState([])
    const history = useHistory()
    const [tripActivities, setTripActivities] = useState([])    
    const [state, setState] = useState("")
    //useState hook function sets the initial value of dog to the defined properties, updateDog is a function you invoke later on to modify the values
    const [trip, setTrip] = useState({})
    const {tripId} = useParams()

    useEffect(
        () => {
            getStates()
                .then((states) => {
                    setStates(states)
                })
        },
        []
    )
    useEffect(
        () => {
            getCities(state)
                .then((cities) => {
                    setCities(cities)
                })
        },
        []
    )
    useEffect(
        () => {
            getCategories()
                .then((categories) => {
                    setCategories(categories)
                })
        },
        []
    )
    useEffect(
        () => {
            getActivities()
                .then((activities) => {
                    setActivities(activities)
                })
        },
        []
    )
    useEffect(
        () => {
            getSingleTrip(tripId)
                .then((trip) => {
                    setTrip(trip)
                })
        },
        []
    )
    //clear the filters by resetting the state
    const clearFilters = (e) => {
        e.preventDefault()
        setState("")
    }


    const updateTripState = (evt) => {
        const newTrip = Object.assign({}, trip)
        newTrip[evt.target.name] = evt.target.value
        setTrip(newTrip)
    }

    const pushActivity = (event) => {
        let copy = [...tripActivities]
        copy.push(event.target.value)
        setTripActivities(copy)
    }

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
            activity: tripActivities
            // rating: trip.rating
        }

        putTrip(editedTrip)
            .then(() => history.push(`/my-trips`))
    }
    

    //this will be the form you display, you need to capture user input and save to new object
    return (
        <form className="tripForm">
            <h2 className="tripForm__title">Edit Your Trip</h2>
            <fieldset>
                <div className="form-group">
                    <label> Destination: </label>
                    <select name="state" className="form-control" value={trip.state?.id}
                    // need to add onChange={e => setState(e.target.value)}
                        onChange={updateTripState}>
                        <option value="0">State</option>
                            {states.map((state) => {
                                return <option value={state.id}>{state.name}</option>
                            })}
                    </select> 
                    {/* need to change the city drop down to only show the cities in the selected state */}
                    <select name="city" className="form-control" value={trip.city?.id}
                        onChange={updateTripState}>
                        <option value="0">City</option>
                            {cities.map((city) => {
                                return <option value={city.id}>{city.name}</option>
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
                        placeholder="Tell us about your trip"
                        onChange={updateTripState} >
                    </textarea>
                </div>
            </fieldset>
            {/* need to finish this section, current activities are not displaying */}
            <fieldset>
                <div className="form-group">
                    <label> Choose from Existing Activities: </label><br></br>
                    <select name="category" className="form-control"
                        onChange={updateTripState}>
                        <option value="0">Category</option>
                            {categories.map((category) => {
                                return <option value={category.id}>{category.name}</option>
                            })}
                    </select> 
                    {/* need to change the city drop down to only show the cities in the selected state */}
                    <select name="activity" className="form-control"
                        onChange={pushActivity}>
                        <option value="0">Activity</option>
                            {activities.map((activity) => {
                                return <option value={activity.id}>{activity.title} at {activity.specific_location}</option>
                            })}
                    </select> <br></br>
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
            {/* <fieldset>
                <div className="form-group">
                    <label htmlFor="sex">Have you already completed this trip?: </label>
                        <input className="radio" type="radio" name="sex" value="Male" onChange={updateTrip}
                        }/>Male
                        <input className="radio" type="radio" name="sex" value="Female" onChange={updateTrip}
                        }/>Female
                </div>
            </fieldset> */}
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
