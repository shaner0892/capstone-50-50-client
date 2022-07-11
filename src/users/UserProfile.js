import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { getCurrentUser } from "./UserManager";
import "./User.css"


export const MyProfile = () => {
    const [user, setUser] = useState({})
    const history = useHistory()

    //fetch by id (/user/id) so navbar works: backend is doing the work
    useEffect(
        () => {
            getCurrentUser()
                .then(setUser)
        },
        []
    )

    return (
        <>
            <section className="userProfile">
                <h2>{user.user?.first_name}'s Profile</h2>
                <img className="userProfilePic" src={user.url}/>
                <article className="userInfo">
                    <div><b>Full Name:</b> {user.user?.first_name} {user.user?.last_name}</div>
                    <div><b>Username:</b> {user.user?.username}</div>
                    <div><b>Email:</b> {user.user?.email}</div>
                    <div><b>Location:</b> {user.location}</div>
                    <div><b>About me:</b> {user.bio}</div>
                </article>
                <Button id="btn" color="success" outline onClick={() => history.push(`/my-profile/edit`)}> Edit Profile </Button>
            </section>
        </>
    )
}