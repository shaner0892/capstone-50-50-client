import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getSingleState } from "./StateManager";
import "./State.css"
import { getCurrentUser } from "../users/UserManager";
import { useHistory } from "react-router-dom";

// this module is responsible for displaying the selected state's profile

export const StateDetails = ({stateId}) => {
    const [state, setState] = useState({})
    // const { stateId } = useParams()
    const [user, setUser] = useState({})
    const history = useHistory()

    useEffect(
        () => {
            getCurrentUser()
                .then(setUser)
        },
        []
    )

    //fetch the information for the state that was clicked on
    useEffect(
        () => {
            getSingleState(stateId)
                .then(setState)
        },
        []
    )

    return (
        // need to display all info: capital, established, population, largest city
        <>
        <section className="stateDetails">
            <h2>{state.name}</h2>
            <img className="stateFlag" src={state.flag_url}/>
            <div> <b>Capital:</b> {state.capital} </div>
            <div> <b>Established:</b> {state.established} </div>
            <div> <b>Population:</b> {state.population} </div>
            <div> <b>Largest City:</b> {state.largest_city} </div>
            {/* add highest rated activities 
            <div> <b>Highest Rated Activities:</b>{state.best_activities}</div> */}
            {
                user.user?.is_staff ? <button onClick={() => history.push(`/edit-state/${state.id}`)}>Edit State</button>
                : ""
            }
        </section>

        </>
    )

}