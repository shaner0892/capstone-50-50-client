import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { getCurrentUser } from "./UserManager";
import "./User.css"
import { getMyTrips } from "../trips/TripManager";

//this module is responsible for displaying the current user's info

export const MyProfile = () => {
    //use useState to define and update user
    const [user, setUser] = useState({})
    //use useParams to implement a single resource view
    // const { userId } = useParams()
    const history = useHistory()
    const [trips, setTrips] = useState([]);

    //use useEffect to monitor for updates to user
    //fetch by id (/user/id)
    useEffect(
        () => {
            getCurrentUser()
                .then(setUser)
            getMyTrips()
                .then(setTrips)
        },
        []
    )

    return (
        <>
            {/* display user's full name, email, location, and bio
            add profile picture
            need to add an edit and deactivate button */}
            <section className="userProfile">
                <h2>{user.user?.first_name}'s Profile</h2>
                <img className="userProfilePic" src={user.url}/>
                <article className="userInfo">
                    <div><b>Full Name:</b> {user.user?.first_name} {user.user?.last_name}</div>
                    <div><b>Username:</b> {user.user?.username}</div>
                    <div><b>Email:</b> {user.user?.email}</div>
                    <div><b>Location:</b> {user.location}</div>
                    <div><b>Total Trips:</b> {trips.length}</div>
                    <div><b>About me:</b> {user.bio}</div>

                </article>
                <Button id="btn" color="success" outline onClick={() => history.push(`/my-profile/edit`)}> Edit Profile </Button>
            </section>
        </>
    )
}