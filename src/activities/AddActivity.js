import React, { useState, useEffect } from "react"
import { getCategories } from "../trips/TripManager";
import { getStates } from "../states/StateManager";
import { getCities } from "../cities/CityManager";
import { postActivity } from './ActivityManager';


export const AddActivity = ({tripActivities, setTripActivities}) => {
    //use the useState hook function to set the initial value of the new object
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])
    const [categories, setCategories] = useState([])
    
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
    useEffect(
        () => {
            getCategories()
                .then((categories) => {
                    setCategories(categories)
                })
        },
        []
    )

    //useState hook function sets the initial value of dog to the defined properties, updateDog is a function you invoke later on to modify the values
    const [activity, setActivity] = useState({
        title: "",
        state: 0,
        city: 0,
        specific_location: "",
        category: 0,
        is_approved: false
    });

    const updateActivity = (evt) => {
        const newActivity = Object.assign({}, activity)
        newActivity[evt.target.name] = evt.target.value
        setActivity(newActivity)
    }

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
            is_approved: false
        }

        postActivity(newActivity)
            .then((res) => {
                let copy = [...tripActivities]
                copy.push(res.id)
                setTripActivities(copy)
            })
    }
    

    //this will be the form you display, you need to capture user input and save to new object
    return (
        <>
        <form className="activityForm">
            {/* <h5 className="activityForm__title">Add a New Activity</h5> */}
            <fieldset>
                <div className="form-group">
                    <label> Title: </label>
                    <input name="title" className="form-control"
                        placeholder="Pint Night with my faves"
                        onChange={updateActivity}
                        /> 
                    </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label> Location: </label>
                    <select name="state" className="form-control"
                        onChange={updateActivity}
                        >
                        <option value="0">State</option>
                            {states.map((state) => {
                                return <option value={state.id}>{state.name}</option>
                            })}
                    </select> 
                    {/* need to change the city drop down to only show the cities in the selected state */}
                    <select name="city" className="form-control"
                        onChange={updateActivity}
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
                    <label htmlFor="specific_location">Specific Location: </label>
                    <input name="specific_location" className="form-control"
                        placeholder="Avondale Brewery"
                        onChange={updateActivity} 
                        />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label> Category: </label>
                    <select name="category" className="form-control"
                        onChange={updateActivity}
                        >
                        <option value="0">Pick a Category</option>
                            {categories.map((category) => {
                                return <option value={category.id}>{category.name}</option>
                            })}
                    </select> 
                    {/* need to change the city drop down to only show the cities in the selected state */}
                </div>
            </fieldset>
            <div>
                <button id="btn" outline className="btn btn-addActivity" onClick={addNewActivity} >Add</button>
            </div>
        </form>
        </>
    )
}
