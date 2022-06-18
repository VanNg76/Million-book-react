import { Link, useHistory } from "react-router-dom"
import React, { useEffect, useState, useRef } from "react";
import { getCurrentUser } from "../user/UserManager"
import Logo from "./BooktoMillion.jpeg"
import "./NavBar.css"


export const NavBar = () => {
  const [currentUser, setCurrentUser] = useState({})
  const history = useHistory()
  const navbar = useRef()
 
  useEffect(() => {
    getCurrentUser()
      .then(user => setCurrentUser(user))
  }, [])

  
  return (
    <nav className="navbar is-primary mb-3" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src={Logo} className="logo-img" alt="logo" />
          <h1 className="title is-3"><span className="logo-text">Book-Millions</span></h1>
        </a>
      </div>

      <div className="navbar-menu" ref={navbar}>
        <div className="navbar-start">
          <div className="navbar-item">
            <Link className="navbar-item" to="/books">Books</Link>
          </div>
          {
            currentUser.is_staff ?
              <>
                <div className="navbar-item">
                  <Link className="navbar-item" to="/authors">Authors</Link>
                </div>
                <div className="navbar-item">
                  <Link className="navbar-item" to="/categories">Categories</Link>
                </div>
                <div className="navbar-item">
                  <Link className="navbar-item" to="/inventories">Inventories</Link>
                </div>
                <div className="navbar-item">
                  <Link className="navbar-item" to="/orders">All Orders</Link>
                </div>
              </>
            :
            <div className="navbar-item">
              <Link className="navbar-item" to="/orders">My Order</Link>
            </div>
          }
        </div>
        
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {
                localStorage.getItem("token") !== null ?
                  <button className="button is-outlined" onClick={() => {
                    localStorage.removeItem("token")
                    history.push({ pathname: "/" })
                  }}>
                    Logout (<span className="has-text-link is-underlined">{currentUser.username}</span>)
                  </button>
                  :
                  <>
                    <Link to="/login" className="button is-outlined">Login</Link>
                    <Link to="/register" className="button is-link">Register</Link>
                  </>
              }
            </div>
         </div>
       </div>
      </div>
    </nav>
  )
}
