import React, { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { getCurrentUser, putUser } from "./UserManager"

//this is the edit user profile page

export const EditMyProfile = (props) => {
    const [user, setUser] = useState({})
    const conflictDialog = useRef()
    const history = useHistory()
    const { userId } = useParams()
    
    //this function fetches the current user from local storage and invokes the setUser function to assign them to user
    //save all of the values you want to change to a single object/bring them to the same level so you can save them
    const existingUserCheck = () => {
        getCurrentUser()
            .then(user => {
                let currentUser = {
                    first_name : user.user.first_name,
                    last_name : user.user.last_name,
                    email : user.user.email,
                    username : user.user.username,
                    location : user.location,
                    bio : user.bio,
                    is_active : true,
                    id : user.id
                }
            setUser(currentUser)})
    }
    useEffect(existingUserCheck, [])

    //invoked on form submit: use PUT method to update the existing object
    const editUser = (evt) => {
        evt.preventDefault()
        putUser(user)
            // reroute the user back to their profile page
            .then(() => history.push(`/my-profile`))
    }

    //this function makes a copy of the user object and then each time the user makes a selection/input it passes it through the setUser function to update the user object
    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }
    //when the user confirms they want to deactivate their account it needs to set is_active to false
    //also needs to log the user out and reroute them to the login page
    const deactivate = () => {
        const copy = {...user}
        copy.is_active = false
        setUser(copy)
}

    //this will be the form you display, you need to capture user input and update the user object
    //add values to each input to display previous user input
    return (
        <>
        <main style={{ textAlign: "center" }}>
            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>Account with that email address already exists</div>
                <button className="button--close" onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>
            <form className="form--login" onSubmit={editUser}>
                <h2 className="h3 mb-3 font-weight-normal">Edit Your Profile</h2>
                <fieldset>
                    <label htmlFor="firstName"> First Name: </label>
                    <input id="first_name" value={user.first_name} onChange={updateUser} type="text" className="form-control" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name: </label>
                    <input id="last_name" value={user.last_name} onChange={updateUser} type="text" className="form-control" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="username"> Username: </label>
                    <input id="username" value={user.username} onChange={updateUser} type="text" className="form-control" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address: </label>
                    <input id="email" value={user.email} onChange={updateUser} type="email" className="form-control" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="location"> Location: </label>
                    <input id="location" value={user.location} onChange={updateUser} type="text" className="form-control" ></input>
                </fieldset>
                <fieldset>
                    <label htmlFor="bio"> About Me: </label>
                    <textarea id="bio" value={user.bio} cols="40" rows="5" onChange={updateUser} type="text" className="form-control" ></textarea>
                </fieldset>
                <fieldset>
                    <button id="btn" outline type="submit"> Save </button>
                    <button id="btn" onClick={() => window.confirm('Are you sure you wish to deactivate your account?') ? deactivate()(localStorage.removeItem("auth_token"))("confirm") 
                    : ("cancel") }> Deactivate My Account </button>
                </fieldset>
            </form>
        </main>
        </>
    )
}
