import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { postTrip } from "./TripManager";
import { getCurrentUser } from "../users/UserManager";
import { getStates } from "../states/StateManager";
import { getCities } from "../cities/CityManager";


export const AddTrip = () => {
    //use the useState hook function to set the initial value of the new object
    const [user, setUser] = useState({})    
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])
    const history = useHistory()

    //this function fetches the current user from local storage and invokes the setUser function to update the user object
    const currentUser = () => {
        getCurrentUser()
            .then(user => setUser(user))
    }

    useEffect(
        () => {
            currentUser()
        },
        []
    )

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
            getCities()
                .then((cities) => {
                    setCities(cities)
                })
        },
        []
    )
    
    //useState hook function sets the initial value of dog to the defined properties, updateDog is a function you invoke later on to modify the values
    const [trip, setTrip] = useState({
        state: 0,
        city: 0,
        about: "",
        start_date: "",
        end_date: "",
        completed: false,
        rating: 0
    });

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
            rating: trip.rating
        }

        postTrip(newTrip)
            .then(() => history.push(`/`))
    }
    //this will be the form you display, you need to capture user input and save to new object
    return (
        <form className="tripForm">
            <h2 className="tripForm__title">Add a Trip</h2>
            <fieldset>
                <div className="form-group">
                    <label> Destination: </label>
                    <select name="state" className="form-control"
                        onChange={
                            (evt) => {
                                const copy = {...trip}
                                copy.state = parseInt(evt.target.value)
                                setTrip(copy)
                            }
                        }
                        >
                        <option value="0">State</option>
                            {states.map((state) => {
                                return <option value={state.id}>{state.name}</option>
                            })}
                    </select> 
                    {/* need to change the city drop down to only show the cities in the selected state */}
                    <select name="city" className="form-control"
                        onChange={
                            (evt) => {
                                const copy = {...trip}
                                copy.city = parseInt(evt.target.value)
                                setTrip(copy)
                            }
                        }
                        >
                        <option value="0">City</option>
                            {cities.map((city) => {
                                return <option value={city.id}>{city.name}</option>
                            })}
                    </select> 
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="about">About: </label>
                    <textarea id="form-about" cols="40" rows="5"
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Tell us about your trip"
                        onChange={
                            (evt) => {
                                const copy = {...trip}
                                copy.about = evt.target.value
                                setTrip(copy)
                            }
                        } ></textarea>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="start_date">Start Date: </label>
                    <input
                        required autoFocus
                        type="date"
                        className="form-control"
                        onChange={
                            (evt) => {
                                const copy = {...trip}
                                copy.start_date = evt.target.value
                                setTrip(copy)
                            }
                        } />
                </div>
                <div className="form-group">
                    <label htmlFor="end_date">End Date: </label>
                    <input
                        required autoFocus
                        type="date"
                        className="form-control"
                        onChange={
                            (evt) => {
                                const copy = {...trip}
                                copy.end_date = evt.target.value
                                setTrip(copy)
                            }
                        } />
                </div>
            </fieldset>
            {/* do I need a completed section? Should I just determine this by the end date and nix it? The idea was a trip may have been cancelled */}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="completed">Have you already completed this trip? </label>
                    <input type="checkbox"
                        className="box"
                        onChange={
                            (evt) => {
                                const copy = {...trip}
                                copy.completed = evt.target.checked
                                setTrip(copy)
                            }
                        } />
                </div>
            </fieldset>
            {/* <fieldset>
                <div className="form-group">
                    <label htmlFor="sex">Have you already completed this trip?: </label>
                        <input className="radio" type="radio" name="sex" value="Male" onChange={
                            (evt) => {
                                const copy = {...dog}
                                copy.sex = evt.target.value
                                updateDog(copy)
                            }
                        }/>Male
                        <input className="radio" type="radio" name="sex" value="Female" onChange={
                            (evt) => {
                                const copy = {...dog}
                                copy.sex = evt.target.value
                                updateDog(copy)
                            }
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
                <button id="btn" color="success" outline className="btn btn-addTrip" onClick={addNewTrip} >
                    Submit
                </button>
            </div>
        </form>
    )
}
