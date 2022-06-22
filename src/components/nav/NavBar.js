import React from "react"
import { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { Nav, NavItem, NavLink } from 'reactstrap';
import { getCurrentUser } from "../../users/UserManager";
import "./NavBar.css"

export const NavBar = () => {
  const history = useHistory()
  const [user, setUser] = useState({})

  useEffect(
    () => {
        getCurrentUser()
            .then(setUser)
    },
    []
)

  return (
    <nav >
      <div className="header">
        <img className="logo" src="https://res.cloudinary.com/dfxsl6a2c/image/upload/v1655504587/5050_1_irzg7x.jpg" alt="logo" />
        {/* <p className="headerText">50/50</p> */}
        <p className="headerSubText">Keep Your Memories Close and Your Adventures Far</p>
      </div>
      <div className="navBar">
        <Nav pills>
          <NavItem class="navBar_item">
            <NavLink href="/">Home</NavLink>
          </NavItem>
          <NavItem class="navBar_item">
            <NavLink href="/all-trips">All Trips</NavLink>
          </NavItem>
          <NavItem class="navBar_item">
            <NavLink href="/all-activities">All Activities</NavLink>
          </NavItem>
          <NavItem class="navBar_item">
            <NavLink href="/my-profile">My Profile</NavLink>
          </NavItem>
          <NavItem class="navBar_item">
            <NavLink href="/my-trips">My Trips</NavLink>
          </NavItem>
          {
            user.user?.is_staff ? <NavItem class="navBar_item">
            <NavLink href="/add-category">Category Manager</NavLink>
          </NavItem> : ""
          }
          <NavItem class="navBar_item">
            <NavLink href="/" onClick={() => {localStorage.removeItem("auth_token")}}>Logout</NavLink>
          </NavItem>
        </Nav>
      </div>
      {/* <div className="navBar">
        <Link to="/" class="navBar_item">Home</Link>
        <Link to="/all-trips" class="navBar_item">All Trips</Link>
        <Link to="/all-activities" class="navBar_item">All Activities</Link>
        <Link to="/my-profile" class="navBar_item">My Profile</Link>
        <Link to="/my-trips" class="navBar_item">My Trips</Link>
        {
          user.user?.is_staff ? <Link to="/add-category" class="navBar_item">"/add-category"</Link> : ""
        }
        <Link to="/" onClick={() => {localStorage.removeItem("auth_token")}}>Logout</Link>
      </div> */}
      
      {/* {
        localStorage.getItem("auth_token") !== null ?
          <button onClick={() => {localStorage.removeItem("auth_token")
            history.push({ pathname: "/" })}}>
            Logout
          </button>
          :
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
      } */}
    </nav>
  )
}
