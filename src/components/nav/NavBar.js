import React from "react"
import { useEffect, useState } from "react"
import { Nav, NavItem, NavLink } from 'reactstrap';
import { getCurrentUser } from "../../users/UserManager";
import "./NavBar.css"


export const NavBar = () => {
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
          {/* if the logged in user is staff, allow them to go to the category manager */}
          {
            user.user?.is_staff ? <NavItem class="navBar_item">
            <NavLink href="/add-category">Categories</NavLink>
          </NavItem> : ""
          }
          <NavItem class="navBar_item">
            <NavLink href="/" onClick={() => {localStorage.removeItem("auth_token")}}>Logout</NavLink>
          </NavItem>
        </Nav>
      </div>
    </nav>
  )
}
