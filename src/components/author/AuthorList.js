import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

import { deleteAuthor, getAuthors } from "./AuthorManager"
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
        <div>
            {
                currentUser?.is_staff ?
                    <button className="button is-dark mt-4"
                    onClick={() => {
                        history.push({ pathname: "/authors/new" })
                    }}
                    >Add Author</button>
                    
                    
                : null
            }
            <div>
                <h2 className="title mt-4 is-4 is-spaced">AUTHORS</h2>
                <table className="table is-striped is-hoverable">
                    <thead>
                        <th className="has-text-centered has-text-link">ID</th>
                        <th className="has-text-centered has-text-link">Name</th>
                        {
                            currentUser?.is_staff ? <th className="has-text-centered has-text-link">Action</th> : null
                        }
                    </thead>
                    <tbody>
                        {authors.map(author => {
                            return (
                                <tr key={`author--${author.id}`}>
                                    <td className=" has-text-link">{author.id}</td>
                                    <td className=" has-text-link">{author.name}</td>
                                    {
                                        currentUser?.is_staff ? 
                                            <td className="has-text-link">
                                                <button className="button is-dark"
                                                    onClick={() => {
                                                        deleteAuthor(author.id)
                                                            .then(getAuthors)
                                                            .then(setAuthors)
                                                    }}
                                                >Delete</button>
                                            </td> : null
                                    }
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
