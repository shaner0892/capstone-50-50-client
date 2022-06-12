import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deleteCity, getCities } from "./CityManager";

// this page should only be viewable to staff

export const CityList = () => {
    //use the useState hook function to set the initial value of the new object
    const [cities, setCities] = useState([]);
    const history = useHistory()

    useEffect(
        () => {
            getCities()
                .then((cities) => {
                    setCities(cities)
                })
        },
        []
    )
    //define a function to delete a city
    //invoke the DELETE method and then fetch the new list of cities
    const removeCity = (id) => {
        deleteCity(id)
            .then(()=> {
                getCities()
                    .then((cities) => {
                        setCities(cities)
                    })
            })
    }
    
    return (
        <>
        <h2>All Cities</h2>
        <section className="cityList">
        <button onClick={() => history.push("/add-city")}>Add a New City</button>
        {
            cities.map((city) => {
                return <section className="city" key={`city--${city.id}`}> 
                    <div>{city.name}, {city.state?.name} </div>
                    <button onClick={() => history.push(`/edit-city/${city.id}`)}>Edit City</button>
                    <button id="btn" onClick={() => {removeCity(city.id)}}> Delete City </button>
                </section>
            })
        }
        </section>
        </>
    )
}
