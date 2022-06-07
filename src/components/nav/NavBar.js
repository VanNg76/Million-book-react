import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
  const history = useHistory()
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link className="navbar__link" to="/books">Books</Link>
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
