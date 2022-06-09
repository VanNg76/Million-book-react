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
        <>
            {
                currentUser?.is_staff ?
                    <button className="btn btn-2 btn-sep icon-create"
                        onClick={() => {
                            history.push({ pathname: "/categories/new" })
                        }}
                    >Add Category</button>
                : null
            }
            <br></br>

            <ul className="categories">
                {
                    categories.map(category => {
                        return (
                            <li className="category__name">Category name: {category.name}</li>
                        )
                    })
                }
            </ul>

        </>
    )
}
