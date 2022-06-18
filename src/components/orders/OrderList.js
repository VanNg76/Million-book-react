import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { getOrders } from "./OrderManager"
import { getCurrentUser } from "../user/UserManager"
import { deleteOrder, getOrderBooks, deleteOrderBook } from "./OrderManager"
import "./order.css"


export const OrderList = () => {
    const [ currentUser, setCurrentUser ] = useState()
    const [ orders, setOrders ] = useState([])
    const [ orderbooks, setOrderBooks ] = useState([])
    
    useEffect(() => {
        getCurrentUser()
            .then(user => setCurrentUser(user))
    }, [])

    useEffect(() => {
        if (currentUser) {
            getOrders()
                .then(orders => setOrders(orders))
            getOrderBooks()
                .then(obs => setOrderBooks(obs))
        }
    }, [currentUser])
    
    const numberFormat = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(value);
    }


    return (
        <form className="box">
            {
                currentUser?.is_staff ?
                    <>
                        <h2 className="title is-4 is-spaced has-text-centered">ALL CUSTOMER ORDERS</h2>

                        <ol>
                            {orders?.map(order => {
                                return (
                                    <li key={`order--${order.id}`}>
                                        <div className="has-text-weight-bold">Customer name:
                                            {" " + order.user.first_name + ' ' + order.user.last_name + " "}
                                            <span className="is-underlined has-text-link">({order.user.username})</span>
                                        </div>
                                        <div>Order date: <span className="has-text-link">{order.date}</span></div>
                                        <div>Order list:</div>
                                        <table className="ml-6 table is-striped is-hoverable is-bordered">
                                            <thead>
                                                <th className="has-text-link">Title</th>
                                                <th className="has-text-link">Quantity</th>
                                            </thead>
                                            <tbody>
                                                {order.ordered_books?.map(ob => {
                                                    return (
                                                        <tr key={`ordered_book--${ob.id}`}>
                                                            <td className="has-text-link">{ob.book.title}</td> 
                                                            <td className="has-text-link">{ob.quantity}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                        <div className="has-text-weight-bold is-underlined">
                                            Total order value: {numberFormat(order.total_value)}
                                        </div>
                                        <button className="button is-dark"
                                            onClick={() => {
                                                deleteOrder(order.id)
                                                    .then(getOrders)
                                                    .then(orders=> setOrders(orders))
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
                    <h2 className="title is-4 is-spaced has-text-centered">MY ORDERS</h2>
                    
                    {
                        orders?.map(order => {
                            return (
                                <div key={`order--${order.id}`} className="order">
                                    <div>Order date: <span className="has-text-link">{order.date}</span></div>
                                    <div>Order list:</div>
                                    <table className="table ml-6 is-striped is-hoverable is-bordered">
                                        <thead className="">
                                            <th className="has-text-centered has-text-link">Title</th>
                                            <th className="has-text-link has-text-centered">Quantity</th>
                                            <th className="has-text-link has-text-centered">Action</th>
                                        </thead>
                                        <tbody>
                                            {order.ordered_books?.map(ob => {
                                                return (
                                                    <tr key={`ordered_book--${ob.id}`}>
                                                        <td className="has-text-link">
                                                            <Link to={`/books/${ob.book.id}`}>{ob.book.title}</Link>    
                                                        </td> 
                                                        <td className="has-text-link">{ob.quantity}</td>
                                                        <td className="has-text-link">
                                                            <button className="btn btn-2 btn-sep icon-edit"
                                                                onClick={() => {
                                                                    const findOrderBook = orderbooks?.find(orderbook => {
                                                                        return (orderbook.order_id === orders[0].id && orderbook.book_id === ob.book.id)
                                                                    })
                                                                    
                                                                    deleteOrderBook(findOrderBook.id)
                                                                        .then(getOrders)
                                                                        .then(orders => setOrders(orders))
                                                                }}
                                                            >Delete Item</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                    <div className="has-text-weight-bold is-underlined">Total Order Value: {numberFormat(order.total_value)}</div>
                                </div>
                            )
                        })
                    }
                </>
            }
        </form>
    )
}