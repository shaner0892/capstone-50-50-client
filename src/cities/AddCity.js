import React, { useState, useEffect } from "react"
import { getStates } from "../states/StateManager";
import { postCity } from "../cities/CityManager";
import { useHistory } from "react-router-dom";


export const AddCity = () => {
    //use the useState hook function to set the initial value of the new object
    const [states, setStates] = useState([])
    const history = useHistory()
    
    useEffect(
        () => {
            getStates()
                .then((states) => {
                    setStates(states)
                })
        },
        []
    )
    

    //useState hook function sets the initial value of dog to the defined properties, updateDog is a function you invoke later on to modify the values
    const [city, setCity] = useState({
        name: "",
        state: 0
    });

    const updateCity = (evt) => {
        const newCity = Object.assign({}, city)
        newCity[evt.target.name] = evt.target.value
        setCity(newCity)
    }

    const addNewCity = (evt) => {
        //capture the evt (event) and prevent the default (form submitted and reset) from happening
        evt.preventDefault()
        //object that we want to send to our API
        const newCity = {
            name: city.name,
            state: city.state
        }
        postCity(newCity)
            .then(() => history.push(`/all-cities`))
    }
    

    //this will be the form you display, you need to capture user input and save to new object
    return (
        <>
        <form className="cityForm">
            <fieldset>
                <div className="form-group">
                    <label> Name of City: </label>
                    <input name="name" className="form-control"
                        onChange={updateCity}
                        /> 
                    </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label> State: </label>
                    <select name="state" className="form-control"
                        onChange={updateCity}
                        >
                        <option value="0">State</option>
                            {states.map((state) => {
                                return <option value={state.id}>{state.name}</option>
                            })}
                    </select> 
                </div>
            </fieldset>
            <div>
                <button id="btn" outline className="btn btn-addCity" onClick={addNewCity} >Add</button>
            </div>
        </form>
        </>
    )
}
