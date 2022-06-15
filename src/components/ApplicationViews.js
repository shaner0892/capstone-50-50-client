import React from "react"
import { Route } from "react-router-dom"
import { EditActivity } from "../activities/EditActivity"
import { AddCategory } from "../categories/AddCategory"
import { EditState } from "../states/EditState"
import { StateDetails } from "../states/StateDetails"
import { AddTrip } from "../trips/AddTrip"
import { AllTrips } from "../trips/AllTrips"
import { EditTrip } from "../trips/EditTrip"
import { MyTrips } from "../trips/MyTrips"
import { TripDetails } from "../trips/TripDetails"
import { EditMyProfile } from "../users/EditUser"
import { MyProfile } from "../users/UserProfile"
import { Map } from "./HomePage"

export const ApplicationViews = () => {
    return <>
        <main>
            <Route exact path="/">
                <Map />
            </Route>
            <Route path="/state/:stateId(\d+)">
                <StateDetails />
            </Route>
            <Route path="/all-trips">
                <AllTrips />
            </Route>
            <Route path="/my-trips">
                <MyTrips />
            </Route>
            <Route path="/trip-details/:tripId(\d+)">
                <TripDetails />
            </Route>
            <Route path="/add-trip">
                <AddTrip />
            </Route>
            <Route path="/edit-trip/:tripId(\d+)">
                <EditTrip />
            </Route>
            <Route exact path="/my-profile">
                <MyProfile />
            </Route>
            <Route path="/my-profile/edit">
                <EditMyProfile />
            </Route>
            
            {/* admin only */}
            <Route path="/edit-state/:stateId(\d+)">
                <EditState />
            </Route>
            <Route path="/add-category">
                <AddCategory />
            </Route>
            <Route path="/edit-activity/:activityId(\d+)">
                <EditActivity />
            </Route>
        </main>
    </>
}
