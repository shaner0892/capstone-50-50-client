import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { getSingleState } from "./StateManager";
import { getCurrentUser } from "../users/UserManager";
import "./State.css"


export const StateDetails = ({stateId}) => {
    const [state, setState] = useState({})
    const [user, setUser] = useState({})
    const history = useHistory()

    useEffect(
        () => {
            getCurrentUser()
                .then(setUser)
            getSingleState(stateId)
                .then(setState)
        },
        []
    )

    return (
        <>
        <section className="stateDetails">
            <h2>{state.name}</h2>
            <img className="stateFlag" src={state.flag_url}/>
            <article className="stateInfo">
                <div> <b>Capital:</b> {state.capital} </div>
                <div> <b>Established:</b> {state.established} </div>
                <div> <b>Population:</b> {state.population} </div>
                <div> <b>Largest City:</b> {state.largest_city} </div>
            </article>
            {/* add highest rated activities 
            <div> <b>Highest Rated Activities:</b>{state.best_activities}</div> */}
            {
                user.user?.is_staff ? <Button color="success" outline onClick={() => history.push(`/edit-state/${state.id}`)}>Edit State</Button>
                : ""
            }
        </section>
        </>
    )

}