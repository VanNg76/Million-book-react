import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import { getCurrentUser } from "../user/UserManager";
import { getBookById, deleteBook } from "./BookManager";
import { getOrders, createOrder, createOrderBook } from "../orders/OrderManager";
import { getInventoryByBookId } from "../inventory/InventoryManager";


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
        // check if order belong to current user not exists: createOrder then createOrderBook
        if (orders.length == 0) {
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
            {
                currentUser?.is_staff ?
                    <>
                        <button className="btn btn-2 btn-sep icon-edit"
                            onClick={() => {
                                history.push({ pathname: `/books/edit/${book.id}` })
                            }}
                        >Edit Book</button>
                        <button className="btn btn-2 btn-sep icon-edit"
                            onClick={() => {
                                deleteBook(book.id)
                                history.push("/books")
                            }}
                        >Delete Book </button>
                    </>
                :
                    <>
                        <label>Order quantity:</label>
                        <input type="number" name="quantity" placeholder="order quantity"
                            onChange={handleInputChange} />
                        <button className="btn btn-2 btn-sep icon-create"
                            onClick={event => submitBook(event)}
                        >Add to my order</button>
                    </>
            }
            <br></br>

            <section key={`book--${book.id}`} className="book">
                <img src={book.cover_image_url} alt={book.title} />
                <div className="book__title">Title: {book.title}</div>
                <div className="book__introduction">Introduction: {book.introduction}</div>
                <div className="book__publicationDate">Publication date: {formatDate(book.publication_date)}</div>
                <div className="book__authorName">Author name: {book.author?.name}</div>
                <div className="book__price">Price: {book.price}</div>
            </section>
        </>
    )
}