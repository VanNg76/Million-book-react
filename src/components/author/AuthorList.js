import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

import { getAuthors } from "./AuthorManager"
import { getCurrentUser } from "../user/UserManager"


export const AuthorList = () => {
    const [ currentUser, setCurrentUser ] = useState()
    const [ authors, setAuthors ] = useState([])

    const history = useHistory()

    useEffect(() => {
        getCurrentUser()
            .then(user => setCurrentUser(user))
    }, [])

    useEffect(() => {
        getAuthors()
            .then(authors => setAuthors(authors))
    }, [])

   
    return (
        <>
            {
                currentUser?.is_staff ?
                    <button className="btn btn-2 btn-sep icon-create"
                        onClick={() => {
                            history.push({ pathname: "/authors/new" })
                        }}
                    >Add Author</button>
                : null
            }
            <br></br>

            <ul className="authors">
                {
                    authors.map(author => {
                        return (
                            <li key={`author--${author.id}`} className="author__name">Author name: {author.name}</li>
                        )
                    })
                }
            </ul>

        </>
    )
}
