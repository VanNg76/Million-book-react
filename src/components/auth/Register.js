import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import { registerUser } from "./AuthManager"
import './Auth.css'
import Logo from "./BooktoMillion.jpeg"
// TODO: This should get you started on registering a new user. 
// Add new fields depending on your server side registration
export const Register = () => {
  const username = useRef()
  const password = useRef()
  const firstName = useRef()
  const lastName = useRef()
  const history = useHistory()

  const handleRegister = (e) => {
    e.preventDefault()

    const newUser = {
      "username": username.current.value,
      "password": password.current.value,
      "first_name": firstName.current.value,
      "last_name": lastName.current.value
    }

    registerUser(newUser).then(res => {
      if ("token" in res) {
        localStorage.setItem("token", res.token)
        history.push("/")
      }
    })

  }

return (
  <main>
    <form className="box" onSubmit={handleRegister}>
      <div className="is-flex">
        <img src={Logo} className="logo-img" alt="logo" />
        <h1 className="title is-2"><strong>Book-Millions</strong></h1>
      </div>
      <h3 className="title is-4 mt-4">Register an account</h3>
      <div className="field">
        <label className="label" htmlFor="inputFirstName">First Name</label>
        <input className="input--login input is-primary ml-3" ref={firstName} type="text" name="firstName" placeholder="First Name" required />
      </div>
      <div className="field">
        <label className="label" htmlFor="inputLastName">Last Name</label>
        <input className="input--login input is-primary ml-3" ref={lastName} type="text" name="lastName" placeholder="Last Name" required />
      </div>
      <div className="field">
        <label className="label" htmlFor="inputUsername">Username</label>
        <input className="input--login input is-primary ml-3" ref={username} type="text" name="username" placeholder="Username" required />
      </div>
      <div className="field">
        <label className="label" htmlFor="inputPassword"> Password </label>
        <input className="input--login input is-primary ml-3" ref={password} type="password" name="password" placeholder="Password" required />
      </div>
      <div className="field">
        <button className="button mt-4 ml-4 is-dark is-medium" type="submit">Register</button>
      </div>
    </form>
    <section>
      Already registered? <Link to="/login">Login</Link>
    </section>
  </main>
)
}
