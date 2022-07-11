import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import { Button } from "reactstrap";
import { loginUser } from "./AuthManager"
import "./Auth.css"


export const Login = () => {
  const username = useRef()
  const password = useRef()
  const invalidDialog = useRef()
  const history = useHistory()

  const handleLogin = (e) => {
    e.preventDefault()
    const user = {
      username: username.current.value,
      password: password.current.value
    }

    loginUser(user)
      .then(res => {
        if ("valid" in res && res.valid && "token" in res) {
          localStorage.setItem("auth_token", res.token)
          history.push("/")
        }
        else {
          invalidDialog.current.showModal()
        }
      })
  }

  return (
    <main >
      <dialog ref={invalidDialog}>
        <div>Username or password was not valid.</div>
        <Button color="success" outline onClick={e => invalidDialog.current.close()}>Close</Button>
      </dialog>
      <div className="header">
        <img className="logo" src="https://res.cloudinary.com/dfxsl6a2c/image/upload/v1655504587/5050_1_irzg7x.jpg" alt="logo" />
        <p className="headerSubText">Keep Your Memories Close and Your Adventures Far</p>
      </div>
      <section>
        <form className="loginForm" onSubmit={handleLogin}>
          <fieldset>
            <label htmlFor="inputUsername"> Username: </label>
            <input ref={username} type="username" id="username" placeholder="Username" required autoFocus />
          </fieldset>
          <fieldset>
            <label htmlFor="inputPassword"> Password: </label>
            <input ref={password} type="password" id="password" placeholder="Password" required />
          </fieldset>
          <fieldset>
            <Button color="success" outline type="submit">Sign In</Button>
          </fieldset>
          <section>
            <Link to="/register">Not a member yet?</Link>
          </section>
        </form>
      </section>
    </main>
  )
}
