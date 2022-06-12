import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getSingleState } from "./StateManager";
import "./State.css"

// this module is responsible for displaying the selected state's profile

export const StateDetails = () => {
    const [state, setState] = useState({})
    const { stateId } = useParams()

    //fetch the information for the state that was clicked on
    useEffect(
        () => {
            getSingleState(stateId)
                .then((state) => {
                    setState(state)
                })
        },
        []
    )

    return (
        // need to display all info: capital, established, population, largest city
        <>
        <h2>{state.name}</h2>
        <img className="stateFlag" src={state.flag_url}/>
        <section className="stateDetails">
            <div> <b>Capital:</b> {state.capital} </div>
            <div> <b>Established:</b> {state.established} </div>
            <div> <b>Population:</b> {state.population} </div>
            <div> <b>Largest City:</b> {state.largest_city} </div>
            {/* add highest rated activities */}
        </section>

        </>
    )

}