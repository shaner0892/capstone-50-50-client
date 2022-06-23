import React, { useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import { Button } from "reactstrap";
import UploadImages from "../pictures/PhotoUpload"
import { getCurrentUser, putUser } from "./UserManager"


export const EditMyProfile = (props) => {
    const [user, setUser] = useState({})
    const conflictDialog = useRef()
    const history = useHistory()
    
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
                    url : user.url,
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
        (localStorage.removeItem("auth_token"))
}

    //this will be the form you display, you need to capture user input and update the user object
    //add values to each input to display previous user input
    return (
        <>
        <main style={{ textAlign: "center" }}>
            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>Account with that email address already exists</div>
                <Button id="btn" color="success" outline className="button--close" onClick={e => conflictDialog.current.close()}>Close</Button>
            </dialog>
            <h2>Edit Your Profile</h2>
            <form className="userForm">
                <div className="picInput">
                        <label htmlFor="image_url"> Profile Picture: </label><br></br>
                        <img className="editProfilePic" src={user.url}/><br></br>
                        <UploadImages isTripPicture={false} obj={user} update={setUser} />
                </div>
                <div className="textInput">
                    <fieldset className="form-group">
                        <label htmlFor="firstName"> First Name: </label>
                        <input id="first_name" value={user.first_name} onChange={updateUser} type="text" className="form-control" required autoFocus />
                    </fieldset>
                    <fieldset className="form-group">
                        <label htmlFor="lastName"> Last Name: </label>
                        <input id="last_name" value={user.last_name} onChange={updateUser} type="text" className="form-control" required autoFocus />
                    </fieldset>
                    <fieldset className="form-group">
                        <label htmlFor="username"> Username: </label>
                        <input id="username" value={user.username} onChange={updateUser} type="text" className="form-control" required />
                    </fieldset>
                    <fieldset className="form-group">
                        <label htmlFor="email"> Email address: </label>
                        <input id="email" value={user.email} onChange={updateUser} type="email" className="form-control" required />
                    </fieldset>
                    <fieldset className="form-group">
                        <label htmlFor="location"> Location: </label>
                        <input id="location" value={user.location} onChange={updateUser} type="text" className="form-control" ></input>
                    </fieldset>
                    <fieldset className="form-group">
                        <label htmlFor="bio"> About Me: </label>
                        <textarea id="bio" value={user.bio} cols="40" rows="5" onChange={updateUser} type="text" className="form-control" ></textarea>
                    </fieldset>
                </div>
            </form>
            <div className="form-buttons">
                <Button id="btn" color="success" outline onClick={editUser}> Save </Button>
                <Button id="btn" color="warning" outline onClick={() => window.confirm('Are you sure you wish to deactivate your account?') ? deactivate()("confirm") 
                : ("cancel") }> Deactivate My Account </Button>
            </div>
        </main>
        </>
    )
}
