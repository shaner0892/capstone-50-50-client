import React, { useState, useEffect } from "react"
import { getStates } from "../states/StateManager";
import { getSingleCity, putCity } from "../cities/CityManager";
import { useParams, useHistory } from "react-router-dom";


// this form should only be viewable to staff

export const EditCity = () => {
    //use the useState hook function to set the initial value of the new object
    const [states, setStates] = useState([])
    const [city, setCity] = useState({})
    const history = useHistory()
    const { cityId } = useParams()
    
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
            getSingleCity(cityId)
                .then((city) => {
                    setCity(city)
                })
        },
        []
    )
    
    //useState hook function sets the initial value of dog to the defined properties, updateDog is a function you invoke later on to modify the values

    // const updateCity = (evt) => {
    //     const editedCity = Object.assign({}, city)
    //     editedCity[evt.target.name] = evt.target.value
    //     setCity(editedCity)
    // }

    const editCity = (evt) => {
        //capture the evt (event) and prevent the default (form submitted and reset) from happening
        evt.preventDefault()
        //object that we want to send to our API
        const editedCity = {
            name: city.name,
            state: city.state
        }
        putCity(cityId, editedCity)
            .then(() => history.push(`/all-cities`))

    }
    

    //this will be the form you display, you need to capture user input and save to new object
    return (
        <>
        <form className="cityForm">
            <fieldset>
                <div className="form-group">
                    <label> Name of City: </label>
                    <input name="name" className="form-control" value={city.name}
                        onChange={(evt) => {
                            const copy = {...city}
                            copy.name = evt.target.value
                            setCity(copy)
                        }}
                        /> 
                    </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label> State: </label>
                    <select name="state" className="form-control" value={city.state?.id}
                        onChange={(evt) => {
                            const copy = {...city}
                            copy.state = parseInt(evt.target.value)
                            setCity(copy)
                        }}
                        >
                        <option value="0">State</option>
                            {states.map((state) => {
                                return <option value={state.id}>{state.name}</option>
                            })}
                    </select> 
                </div>
            </fieldset>
            <div>
                <button id="btn" outline className="btn btn-editCity" onClick={editCity} >Save</button>
            </div>
        </form>
        </>
    )
}
