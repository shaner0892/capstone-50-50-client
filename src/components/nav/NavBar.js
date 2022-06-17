import React from "react"
import { Link, useHistory } from "react-router-dom"
import { Nav, NavItem, NavLink } from 'reactstrap';
import "./NavBar.css"

export const NavBar = () => {
  const history = useHistory()

  return (
    <nav >
      <div className="header">
        <img className="logo" src="https://res.cloudinary.com/dfxsl6a2c/image/upload/v1655419574/5050_cjm5jz.jpg" alt="logo" />
        {/* <h1>50/50</h1>
        <h3>Your Travel Guide and Tracker</h3> */}
      </div>
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
          <NavItem class="navBar_item">
            <NavLink href="/" onClick={() => {localStorage.removeItem("auth_token")}}>Logout</NavLink>
          </NavItem>
        </Nav>
      </div> */}
      <div className="navBar">
        <Link to="/" class="navBar_item">Home</Link>
        <Link to="/all-trips" class="navBar_item">All Trips</Link>
        <Link to="/my-profile" class="navBar_item">My Profile</Link>
        <Link to="/my-trips" class="navBar_item">My Trips</Link>
        <Link to="/" onClick={() => {localStorage.removeItem("auth_token")}}>Logout</Link>
      </div>
      
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
