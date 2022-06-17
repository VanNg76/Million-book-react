import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import "./Auth.css"
import { loginUser } from "./AuthManager"


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
          <fieldset>
            <label htmlFor="inputUsername"> Username</label>
            <input className="ml-3" ref={username} type="username" id="username" placeholder="Username" required autoFocus />
          </fieldset>
          <fieldset>
            <label htmlFor="inputPassword"> Password </label>
            <input className="ml-3 mt-2" ref={password} type="password" id="password" placeholder="Password" required />
          </fieldset>
          <fieldset>
            <button className="mt-4" type="submit">Sign In</button>
          </fieldset>
          <fieldset className="mt-3">
            <Link to="/register">Not a member yet?</Link>
          </fieldset>
        </form>
      </section>
    </main>
  )
}
