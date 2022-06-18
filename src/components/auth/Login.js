import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import "./Auth.css"
import { loginUser } from "./AuthManager"
import Logo from "./BooktoMillion.jpeg"


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
          localStorage.setItem("token", res.token)
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
        <button onClick={e => invalidDialog.current.close()}>Close</button>
      </dialog>
      <section>
        <form className="box" onSubmit={handleLogin}>
          <div className="is-flex">
            <img src={Logo} className="logo-img" alt="logo" />
            <h1 className="title is-2"><strong>Book-Millions</strong></h1>
          </div>
          <div className="field mt-4">
            <label className="label" htmlFor="inputUsername"> Username</label>
            <input className="input--login input is-primary ml-3" ref={username} type="username" id="username" placeholder="Username" required autoFocus />
          </div>
          <div className="field">
            <label className="label" htmlFor="inputPassword"> Password </label>
            <input className="input--login input is-primary ml-3 mt-2 mr-6" ref={password} type="password" id="password" placeholder="Password" required />
          </div>
          <div className="field">
            <button className="button mt-4 ml-4 is-dark is-medium" type="submit">Sign In</button>
          </div >
          <div className="mt-3 ml-4 field">
            <Link to="/register">Not a member yet?</Link>
          </div>
        </form>
      </section>
    </main>
  )
}
