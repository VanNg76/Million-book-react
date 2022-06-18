import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

import { getCategories } from "./CategoryManager"
import { getCurrentUser } from "../user/UserManager"


export const CategoryList = () => {
    const [ currentUser, setCurrentUser ] = useState()
    const [ categories, setCategories ] = useState([])

    const history = useHistory()

    useEffect(() => {
        getCurrentUser()
            .then(user => setCurrentUser(user))
    }, [])

    useEffect(() => {
        getCategories()
            .then(categories => setCategories(categories))
    }, [])

   
    return (
        <form className="box">
            {
                currentUser?.is_staff ?
                    <button className="button is-dark"
                        onClick={() => {
                            history.push({ pathname: "/categories/new" })
                        }}
                    >Add Category</button>
                : null
            }
            <h2 className="title mt-6 is-4 is-spaced">CATEGORIES</h2>
            <table className="table is-striped is-hoverable">
                <thead>
                    <th className="has-text-centered has-text-link">ID</th>
                    <th className="has-text-centered has-text-link">Type</th>
                </thead>
                <tbody>
                    {
                        categories.map(category => {
                            return (
                                <tr key={`category--${category.id}`}>
                                    <td className=" has-text-link">{category.id}</td>
                                    <td className=" has-text-link">{category.name}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </form>
    )
}
