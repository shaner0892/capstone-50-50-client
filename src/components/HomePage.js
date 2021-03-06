import React from "react"
import USAMap from "react-usa-map"
import { useEffect, useState } from "react"
import Popup from "../components/Popup";
import { getStates } from "../states/StateManager"
import { getCurrentUser } from "../users/UserManager"
import { StateDetails } from "../states/StateDetails"
import "./App.css"


export const Map = () => {
    const [states, setStates] = useState([])
    const [statesVisited, setStatesVisited] = useState([])
    const [buttonPopup, setButtonPopup] = useState(false)
    const [state, setState] = useState({})

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

    // when a user clicks on a state, it sets the popup to true and sets the state selected
    const statePopup = (stateId) => {
        setState(stateId)
        setButtonPopup(true);
    }

    // for each of the states check if that state is in the statesVisited array; if so it's filled blue, if not it's filled green
    // on click set statePopup to the state id so the popup window knows which state details to display
    const stateColors = () => {
        let statesObject = {}
        // the react map template is expecting two arguments: what color to fill and what to do on click
        states.forEach(state => {
            statesObject[state.postal_abbreviation] = {fill: statesVisited.includes(state.id) ? "rgb(34, 81, 157)" : "rgb(46, 106, 70)", clickHandler: () => statePopup(state.id)}
        })
        return statesObject
    }

    return (
        <>
        <section className="homepageHeader">
            <h2>States Visited: {statesVisited.length}/50</h2>
            <p className="beenTo"><b>Where you've been</b></p>
            <p className="leftTo"><b>Still left to explore</b></p>
        </section>
        <section className="homepageMap">
            <USAMap customize={stateColors()}/>
        </section>
        {/* initially button popup is false, but when a user clicks on a state it is assigned a value triggering the popup to true/display */}
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
            <StateDetails stateId={state}/>
        </Popup>
        </>
    )
}