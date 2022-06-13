import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { getCurrentUser } from "./UserManager";

//this module is responsible for displaying the current user's info

export const MyProfile = () => {
    //use useState to define and update user
    const [user, setUser] = useState({})
    //use useParams to implement a single resource view
    const { userId } = useParams()
    const history = useHistory()
    
    //use useEffect to monitor for updates to user
    //fetch by id (/user/id)
    useEffect(
        () => {
            getCurrentUser()
                .then(setUser)
        },
        []
    )

    return (
        <>
            {/* display user's full name, email, location, and bio
            add profile picture
            need to add an edit and deactivate button */}
            <h2>{user.user?.first_name}'s Page</h2>
            <section className="userProfile">
                <div><b>Full Name:</b> {user.user?.first_name} {user.user?.last_name}</div>
                <div><b>Username:</b> {user.user?.username}</div>
                <div><b>Email:</b> {user.user?.email}</div>
                <div><b>Location:</b> {user.location}</div>
                <div><b>About me:</b> {user.bio}</div>
                <button id="btn" onClick={() => history.push(`/my-profile/${userId}/edit`)}> Edit Profile </button>
            </section>
        </>
    )
}