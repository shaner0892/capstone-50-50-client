import React from "react"
import { Route } from "react-router-dom"
import { AddTrip } from "../trips/AddTrip"
import { AllTrips } from "../trips/AllTrips"
import { MyTrips } from "../trips/MyTrips"
import { EditMyProfile } from "../users/EditUser"
import { MyProfile } from "../users/UserProfile"

export const ApplicationViews = () => {
    return <>
        <main>
            50/50
            <Route path="/all-trips">
                <AllTrips />
            </Route>
            <Route path="/my-trips">
                <MyTrips />
            </Route>
            <Route path="/add-trip">
                <AddTrip />
            </Route>
            <Route exact path="/my-profile/:userId(\d+)">
                <MyProfile />
            </Route>
            <Route path="/my-profile/:userId(\d+)/edit">
                <EditMyProfile />
            </Route>
        </main>
    </>
}
