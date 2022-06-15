import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom";
import { getSingleState, putState } from "./StateManager";

// this form should only be viewable to staff

export const EditState = () => {
    //use the useState hook function to set the initial value of the new object
    const [state, setState] = useState({})
    const history = useHistory()
    const { stateId } = useParams()
    
    useEffect(
        () => {
            getSingleState(stateId)
                .then(setState)
        },
        []
    )

    const editState = (evt) => {
        //capture the evt (event) and prevent the default (form submitted and reset) from happening
        evt.preventDefault()
        //object that we want to send to our API
        const editedState = {
            name: state.name,
            postal_abbreviation: state.postal_abbreviation,
            capital: state.capital,
            established: state.established,
            population: state.population,
            flag_url: state.flag_url,
            largest_city: state.largest_city
        }
        putState(stateId, editedState)
            .then(() => history.push(`/`))
    }
    //this function makes a copy of the state object and then each time the user makes a selection/input it passes it through the setState function to update the state object
    const updateState = (evt) => {
        const copy = {...state}
        copy[evt.target.name] = evt.target.value
        setState(copy)
    }

    //this will be the form you display, you need to capture user input and save to new object
    return (
        <>
        <form className="stateForm">
            <fieldset>
                <div className="form-group">
                    <label> State Name: </label>
                    <input name="name" className="form-control" value={state.name}
                        onChange={updateState}
                        /> 
                    </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label> Postal Abbreviation: </label>
                    <input name="postal_abbreviation" className="form-control" value={state.postal_abbreviation}
                        onChange={updateState}
                        /> 
                    </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label> Capital: </label>
                    <input name="capital" className="form-control" value={state.capital}
                        onChange={updateState}
                        /> 
                    </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label> Established: </label>
                    <input name="established" className="form-control" value={state.established}
                        onChange={updateState}
                        /> 
                    </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label> Population </label>
                    <input name="population" className="form-control" value={state.population}
                        onChange={updateState}
                        /> 
                    </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label> Flag URL: </label>
                    <input name="flag_url" className="form-control" value={state.flag_url}
                        onChange={updateState}
                        /> 
                    </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label> Largest City: </label>
                    <input name="largest_city" className="form-control" value={state.largest_city}
                        onChange={updateState}
                        /> 
                    </div>
            </fieldset>
            <div>
                <button id="btn" outline className="btn btn-editState" onClick={editState} >Save</button>
            </div>
        </form>
        </>
    )
}
