import React from "react"
import { Route } from "react-router-dom"
import { AddCity } from "../cities/AddCity"
import { CityList } from "../cities/CityList"
import { EditCity } from "../cities/EditCity"
import { StateDetails } from "../states/StateDetails"
import { AddTrip } from "../trips/AddTrip"
import { AllTrips } from "../trips/AllTrips"
import { EditTrip } from "../trips/EditTrip"
import { MyTrips } from "../trips/MyTrips"
import { EditMyProfile } from "../users/EditUser"
import { MyProfile } from "../users/UserProfile"

export const ApplicationViews = () => {
    return <>
        <main>
            50/50
            <Route path="/state/:stateId(\d+)">
                <StateDetails />
            </Route>
            <Route path="/all-trips">
                <AllTrips />
            </Route>
            <Route path="/my-trips">
                <MyTrips />
            </Route>
            <Route path="/add-trip">
                <AddTrip />
            </Route>
            <Route path="/edit-trip/:tripId(\d+)">
                <EditTrip />
            </Route>
            <Route exact path="/my-profile/:userId(\d+)">
                <MyProfile />
            </Route>
            <Route path="/my-profile/:userId(\d+)/edit">
                <EditMyProfile />
            </Route>
            <Route path="/all-cities">
                <CityList />
            </Route>
            <Route path="/add-city">
                <AddCity />
            </Route>
            <Route path="/edit-city/:cityId(\d+)">
                <EditCity />
            </Route>
        </main>
    </>
}
