import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import { Button } from "reactstrap";
import { registerUser } from "./AuthManager"
import './Auth.css'

// Add new fields depending on server side registration
export const Register = () => {
  const firstName = useRef()
  const lastName = useRef()
  const email = useRef()
  const username = useRef()
  const bio = useRef()
  const location = useRef()
  const password = useRef()
  const verifyPassword = useRef()
  const passwordDialog = useRef()
  const history = useHistory()

  const handleRegister = (e) => {
    e.preventDefault()

    if (password.current.value === verifyPassword.current.value) {
      const newUser = {
        "username": username.current.value,
        "first_name": firstName.current.value,
        "last_name": lastName.current.value,
        "email": email.current.value,
        "location": location.current.value,
        "bio": bio.current.value,
        "password": password.current.value,
        "image_url": "https://media.gettyimages.com/vectors/hiking-circular-logo-vector-id654094086"
      }

      registerUser(newUser).then(res => {
        if ("token" in res) {
          localStorage.setItem("auth_token", res.token)
          history.push("/")
        }
      })
    } else {
      passwordDialog.current.showModal()
    }
  }

return (
  <main>
    <div className="header">
        <img className="logo" src="https://res.cloudinary.com/dfxsl6a2c/image/upload/v1655504587/5050_1_irzg7x.jpg" alt="logo" />
        <p className="headerSubText">Keep Your Memories Close and Your Adventures Far</p>
      </div>
    <form className="registerForm" onSubmit={handleRegister}>
      <h3>Register an account</h3>
      <fieldset>
        <label htmlFor="inputUsername">Username: </label>
        <input ref={username} type="text" name="username" placeholder="Username" required />
      </fieldset>
      <fieldset>
        <label htmlFor="inputFirstName"> First Name: </label>
        <input ref={firstName} type="firstName" name="firstName" placeholder="David" required />
      </fieldset>
      <fieldset>
        <label htmlFor="inputLastName"> Last Name: </label>
        <input ref={lastName} type="lastName" name="lastName" placeholder="Rose" required />
      </fieldset>
      <fieldset>
        <label htmlFor="inputEmail"> Email: </label>
        <input ref={email} type="email" name="email" placeholder="david@gmail.com" required />
      </fieldset>
      <fieldset>
        <label htmlFor="inputLocation"> Location: </label>
        <input ref={location} type="location" name="location" placeholder="Schitt's Creek, MO" />
      </fieldset>
      <fieldset>
        <label htmlFor="inputBio"> Bio: </label>
        <textarea ref={bio} type="bio" name="bio" placeholder="Tell us about yourself" cols="40" rows="5" ></textarea>
      </fieldset>
      <fieldset>
        <label htmlFor="inputPassword"> Password: </label>
        <input ref={password} type="password" name="password" placeholder="Password" required />
      </fieldset>
      <fieldset>
        <label htmlFor="inputPassword"> Re-enter Password: </label>
      <input ref={verifyPassword} type="password" name="password" placeholder="Verify Password" required />
      </fieldset>
      <fieldset>
        <Button color="success" outline type="submit">Register</Button>
      </fieldset>
      <section>
        Already registered? <Link to="/login">Login</Link>
      </section>
    </form>
  </main>
)
}
