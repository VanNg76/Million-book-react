import React, { useEffect, useState } from "react"

import { getOrders } from "./OrderManager"
import { getCurrentUser } from "../user/UserManager"

export const OrderList = () => {
    const [ currentUser, setCurrentUser ] = useState()
    const [ orders, setOrders ] = useState([])

    useEffect(() => {
        getCurrentUser()
            .then(user => setCurrentUser(user))
    }, [])

    useEffect(() => {
        if (currentUser) {
            getOrders()
                .then(orders => setOrders(orders))
        }
    }, [currentUser])

    return (
        <>
            <h2>Orders</h2>
                {
                    orders?.map(order => {
                        return (
                            <div key={`order--${order.id}`} className="order">
                                <div>Order date: {order.date}</div>
                                <div>Order items:</div>
                                <ol>
                                    {order?.books.map(book => {
                                        return (
                                            <li key={`book--${book.id}`}>
                                                Title: {book.title}, 
                                                Quantity: {book.order_quantity}
                                                <button className="btn btn-2 btn-sep icon-edit"
                                                    onClick={() => {
                                                        // history.push({ pathname: `/orderbooks/edit/${book.id}` })
                                                    }}
                                                >Change quantity</button>
                                                <button className="btn btn-2 btn-sep icon-edit"
                                                    onClick={() => {
                                                        // deleteOrderedBook(book.id)
                                                        // history.push("/orders")
                                                    }}
                                                >Delete Item</button>
                                            </li>
                                        )
                                    })}
                                </ol>
                                <div>Total order value: {order.total_value.toFixed(2)}</div>
                            </div>
                        )
                    })
                }
        </>
    )
}