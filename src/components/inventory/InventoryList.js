import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

import { getInventories } from "./InventoryManager"
import { getCurrentUser } from "../user/UserManager"


export const InventoryList = () => {
    const [ currentUser, setCurrentUser ] = useState()
    const [ inventories, setInventories ] = useState([])

    const history = useHistory()

    useEffect(() => {
        getCurrentUser()
            .then(user => setCurrentUser(user))
        getInventories()
            .then(inventories => setInventories(inventories))
    }, [])

   
    return (
        <form className="box">
            {
                currentUser?.is_staff ?
                    <button className="button is-dark"
                        onClick={() => {
                            history.push({ pathname: "/inventories/new" })
                        }}
                    >Add inventory</button>
                : null
            }
            <h2 className="title mt-6 is-4 is-spaced">INVENTORIES</h2>
            <table className="table is-striped is-hoverable">
                <thead>
                    <th className="has-text-centered has-text-link">Book ID</th>
                    <th className="has-text-centered has-text-link">Title</th>
                    <th className="has-text-centered has-text-link">Current inventory</th>
                </thead>
                <tbody>
                    {
                        inventories.map(inventory => {
                            return (
                                <tr key={`inventory--${inventory.id}`}>
                                    <td className="has-text-link">{inventory.book.id}</td>
                                    <td className="has-text-link">{inventory.book.title}</td>
                                    <td className="has-text-link">{inventory.quantity}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </form>
    )
}
