import { Link, useHistory } from "react-router-dom"
import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../user/UserManager"
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
      <Link to="/">Home</Link>
      <Link className="navbar__link" to="/books">Books</Link>
      {
        currentUser.is_staff ?
          <>
            <Link className="navbar__link" to="/authors">Authors</Link>
            <Link className="navbar__link" to="/categories">Categories</Link>
          </>
        : null
      }
      {
        localStorage.getItem("token") !== null ?
          <button onClick={() => {
            localStorage.removeItem("token")
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
