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
        <>
            {
                currentUser?.is_staff ?
                    <button className="btn btn-2 btn-sep icon-create"
                        onClick={() => {
                            history.push({ pathname: "/inventories/new" })
                        }}
                    >Add inventory</button>
                : null
            }
            <br></br>

            <h2>Inventories</h2>
            <ol className="inventories">
                {
                    inventories.map(inventory => {
                        return (
                            <li key={`inventory--${inventory.id}`} className="inventory__name">
                                Book ID: {inventory.book.id},
                                Title: {inventory.book.title},
                                Current inventory: {inventory.quantity}
                            </li>
                        )
                    })
                }
            </ol>

        </>
    )
}
