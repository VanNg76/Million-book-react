import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

import { getOrders } from "./OrderManager"
import { getCurrentUser } from "../user/UserManager"
import { deleteOrder } from "./OrderManager"


export const OrderList = () => {
    const [ currentUser, setCurrentUser ] = useState()
    const [ orders, setOrders ] = useState([])
    const history = useHistory()
    const [ isChanged, setIsChanged ] = useState(false)
    
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
    
    useEffect(() => {
        getOrders()
            .then(orders, setOrders(orders))
    }, [isChanged])

    const numberFormat = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(value);
    }


    return (
        <>
            {
                currentUser?.is_staff ?
                    <>
                        <h2>All Customer Orders</h2>
                        <ol>
                            {orders?.map(order => {
                                return (
                                    <li key={`order--${order.id}`} className="order">
                                        <div>Customer name: {order.user.first_name + ' ' + order.user.last_name}</div>
                                        <div>Order date: {order.date}</div>
                                        <div>Order list:</div>
                                        <ul>
                                            {order.ordered_books?.map(ob => {
                                                return (
                                                    <li key={`ordered_book--${ob.id}`}>
                                                        Title: {ob.book.title}, 
                                                        Quantity: {ob.quantity}
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                        <div>Total order value: {numberFormat(order.total_value)}</div>
                                        <button className="btn btn-2 btn-sep icon-edit"
                                            onClick={() => {
                                                deleteOrder(order.id)
                                            }}
                                        >Delete Order</button>
                                        <br></br><br></br>
                                    </li>
                                )
                            })}
                        </ol>
                    </>    
                :
                <>
                    <h2>My Order</h2>
                    {
                        orders?.map(order => {
                            return (
                                <div key={`order--${order.id}`} className="order">
                                    <div>Order date: {order.date}</div>
                                    <div>Order list:</div>
                                    <ol>
                                        {order.ordered_books?.map(ob => {
                                            return (
                                                <li key={`ordered_book--${ob.id}`}>
                                                    Title: {ob.book.title}, 
                                                    Quantity: {ob.quantity}
                                                    <button className="btn btn-2 btn-sep icon-edit"
                                                        onClick={() => {
                                                            // history.push({ pathname: `/orderbooks/edit/${book.id}` })
                                                        }}
                                                    >Change quantity</button>
                                                    <button className="btn btn-2 btn-sep icon-edit"
                                                        onClick={() => {
                                                            // deleteOrderedBook(book.id, order.id)
                                                            // history.push("/orders")
                                                        }}
                                                    >Delete Item</button>
                                                </li>
                                            )
                                        })}
                                    </ol>
                                    <div>Total order value: {numberFormat(order.total_value)}</div>
                                </div>
                            )
                        })
                    }
                </>

            }
        </>
    )
}