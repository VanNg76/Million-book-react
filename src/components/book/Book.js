import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import { getCurrentUser } from "../user/UserManager";
import { getBookById, deleteBook } from "./BookManager";
import { getOrders, createOrder, createOrderBook } from "../orders/OrderManager";
import { getInventoryByBookId } from "../inventory/InventoryManager";
import "./Book.css"


export const Book = () => {
    const [ currentUser, setCurrentUser ] = useState()
    const [ book, setBook ] = useState({publication_date:""})
    const { bookId } = useParams()
    const history = useHistory()
    const [ orders, setOrders ] = useState([])
    const [ orderBook, setOrderBook ] = useState({quantity: 0})
    const [ inventories, setInventories] = useState([])

    useEffect(() => {
        getCurrentUser()
            .then(user => setCurrentUser(user))
        getOrders()
            .then(orders => setOrders(orders))
    }, [])

    useEffect(() => {
        if (bookId) {
            getBookById(bookId)
                .then(book => setBook(book))
            getInventoryByBookId(bookId)
                .then(inventories => setInventories(inventories))
            const copy = {...orderBook}
            copy["book_id"] = parseInt(bookId)
            setOrderBook(copy)
        }
    }, [bookId])

    const formatDate = (date) => {
        const dateArray = date.split("-")
        const newDate = dateArray[1] + "/" + dateArray[2] + "/" + dateArray[0]
        return newDate
    }

    const handleInputChange = (event) => {
        if (inventories[0].quantity < parseInt(event.target.value)) {
            alert(`Not enough inventory! Only ${inventories[0].quantity} units left.
            Enter new quantity.`)
        } else {
            const copy = { ...orderBook }
            copy[event.target.name] = parseInt(event.target.value)
            setOrderBook(copy)
        }
    }

    const submitBook = (event) => {
        event.preventDefault()
        // check if order belong to current user not exists: createOrder then createOrderBook
        if (orders.length === 0) {
            createOrder({})
                .then(res => {
                    const newOrderBook = {
                        order_id: res.id,
                        quantity: orderBook.quantity,
                        book_id: orderBook.book_id
                    }
                    createOrderBook(newOrderBook)
                        .then(() => history.push("/orders"))
                })
        }
        else {
            const newOrderBook = {
                order_id: orders[0].id,
                quantity: orderBook.quantity,
                book_id: orderBook.book_id
            }
            createOrderBook(newOrderBook)
                .then(() => history.push("/orders"))
        }
    }

    
    return (
        <>
            <form>
                {
                    currentUser?.is_staff ?
                        <>
                            <button className="button is-dark m-2 $"
                                onClick={() => {
                                    history.push({ pathname: `/books/edit/${book.id}` })
                                }}
                            >Edit Book</button>
                            <button className="button is-dark m-2"
                                onClick={() => {
                                    deleteBook(book.id)
                                    history.push("/books")
                                }}
                            >Delete Book </button>
                        </>
                    :
                        <>
                            <label>Order quantity:</label>
                            <input type="number" name="quantity" placeholder="number"
                                className="input is-primary" onChange={handleInputChange} />
                            <button className="button is-dark mt-3"
                                onClick={event => submitBook(event)}
                            >Add to MY ORDER</button>
                        </>
                }
            </form>

            <div key={`book--${book.id}`} className="card mt-6 is-flex is-flex-direction-row">
                <div className="card-image">
                    <figure>
                        <img className="image--book" src={book.cover_image_url} alt={book.title} />
                    </figure>
                </div>
                {/* <div className="is-flex is-justify-content-center">
                </div> */}
                <div className="card-content">
                    <div className="content">
                        <div className="tile is-parent p-0 mt-3">
                            <div className="tile is-child is-2">Title</div>
                            <div className="tile is-child is-8"><strong>{book.title}</strong></div>
                        </div>
                        <div className="tile is-parent p-0">
                            <div className="tile is-child is-2">Introduction</div>
                            <div className="tile is-child is-8 has-text-justified">{book.introduction}</div>
                        </div>
                        <div className="tile is-parent p-0">
                            <div className="tile is-child is-2">Publication date</div>
                            <div className="tile is-child is-8">{formatDate(book.publication_date)}</div>
                        </div>
                        <div className="tile is-parent p-0">
                            <div className="tile is-child is-2">Author name</div>
                            <div className="tile is-child is-8"><strong>{book.author?.name}</strong></div>
                        </div>
                        <div className="tile is-parent p-0">
                            <div className="tile is-child is-2">Price</div>
                            <div className="tile is-child is-8"><strong>${book.price}</strong></div>
                        </div>
                    </div>
                </div>
            </div>
        </>   
    )
}