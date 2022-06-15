import React from "react"
import { Link, useHistory } from "react-router-dom"
import { Nav, NavItem, NavLink } from 'reactstrap';
import "./NavBar.css"

export const NavBar = () => {
  const history = useHistory()

  return (
    <nav>
      50/50
      {/* <div className="navBar">
        <Nav pills>
          <NavItem class="navBar_item">
            <NavLink href="/">Home</NavLink>
          </NavItem>
          <NavItem class="navBar_item">
            <NavLink href="/all-trips">All Trips</NavLink>
          </NavItem>
          <NavItem class="navBar_item">
            <NavLink href="/my-profile">My Profile</NavLink>
          </NavItem>
          <NavItem class="navBar_item">
            <NavLink href="/my-trips">My Trips</NavLink>
          </NavItem>
        </Nav>
      </div> */}
      <Link to="/">Home</Link>
      <Link to="/all-trips">All Trips</Link>
      {/* my-profile/ needs to have user id  */}
      <Link to="/my-profile">My Profile</Link>
      <Link to="/my-trips">My Trips</Link>
      
      {
        localStorage.getItem("auth_token") !== null ?
          <button onClick={() => {
            localStorage.removeItem("auth_token")
            history.push({ pathname: "/" })
          }}>
            Logout
          </button>
          :
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
      }
    </nav>
  )
}
