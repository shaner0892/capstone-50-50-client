import React from "react"
import { useHistory } from "react-router-dom"
import USAMap from "react-usa-map"
import { useEffect, useState } from "react"
import { getStates } from "../states/StateManager"
import { getCurrentUser } from "../users/UserManager"
import "./App.css"
import Popup from "reactjs-popup"

export const Map = () => {
    const [states, setStates] = useState([])
    const [statesVisited, setStatesVisited] = useState([])
    const history = useHistory()
    const [buttonPopup, setButtonPopup] = useState(false)


    useEffect(
        () =>{
            getStates()
                .then(setStates)
            getCurrentUser()
                .then((res) => {
                    // get the current user so that you have access to the states_visited custom property
                    // change the state objects into just ids for easier comparison
                    let visited = res.states_visited.map(state => state.id)
                    setStatesVisited(visited)
                })
        },
        []
    )

    // const stateColors = () => {
    //     const pushToState = (evt, stateId) => {
    //         evt.preventDefault()
    //         setButtonPopup(evt.target.id)}
    //                 <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
    //                     <div>Test popup</div>
    //                 </Popup>
    //     let statesObject = {}
    //     // the react map template is expecting two arguments: what color to fill and what to do on click
    //     states.forEach(state => {
    //         if(statesVisited.length === 0){
    //             statesObject[state.postal_abbreviation] = {fill: "rgb(46, 106, 70)", clickHandler: (evt) => pushToState(evt, state.id)}
    //         }else {
    //             statesObject[state.postal_abbreviation] = {fill: statesVisited.includes(state.id) ? "rgb(34, 81, 157)" : "rgb(46, 106, 70)", clickHandler: () => pushToState(state.id)}
    //         }
    //     })
    //     return statesObject
    // }

    const stateColors = () => {
        const pushToState = (stateId) => {
            history.push(`/state/${stateId}`)
        }
        let statesObject = {}
        // the react map template is expecting two arguments: what color to fill and what to do on click
        states.forEach(state => {
            if(statesVisited.length === 0){
                statesObject[state.postal_abbreviation] = {fill: "rgb(46, 106, 70)", clickHandler: () => pushToState(state.id)}
            }else {
                statesObject[state.postal_abbreviation] = {fill: statesVisited.includes(state.id) ? "rgb(34, 81, 157)" : "rgb(46, 106, 70)", clickHandler: () => pushToState(state.id)}
            }
        })
        return statesObject
    }
    
    return (
        <>
        {/* <h2>Track Your Travels</h2> */}
        <section className="homepageHeader">
            <h2>Visited States: {statesVisited.length}/50</h2>
            <p className="beenTo"><b>Where you've been</b></p>
            <p className="leftTo"><b>Still left to explore</b></p>
        </section>
        <section className="homepageMap">
            <USAMap customize={stateColors()}/>
        </section>
        </>
    )
}