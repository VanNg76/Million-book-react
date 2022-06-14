import { Link, useHistory } from "react-router-dom"
import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../user/UserManager"
import Logo from "./bookstore.png"
import "./NavBar.css"


export const NavBar = () => {
  const history = useHistory()
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    getCurrentUser()
      .then(user => setCurrentUser(user))
  }, [])

  
  return (
    <nav>
      <Link className="navbar__link" to="/">
        <img src={Logo} alt="logo" />
      </Link>
      <Link className="navbar__link" to="/books">Books</Link>
      {
        currentUser.is_staff ?
          <>
            <Link className="navbar__link" to="/authors">Authors</Link>
            <Link className="navbar__link" to="/categories">Categories</Link>
            <Link className="navbar__link" to="/inventories">Inventories</Link>
            <Link className="navbar__link" to="/orders">All Orders</Link>
          </>
        : 
        <Link className="navbar__link" to="/orders">My Order</Link>
      }
      
      {
        localStorage.getItem("token") !== null ?
          <button onClick={() => {
            localStorage.removeItem("token")
            history.push({ pathname: "/" })
          }}>
            Logout (<span>{currentUser.username}</span>)
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
