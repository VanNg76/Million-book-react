import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import { getCurrentUser } from "../user/UserManager";
import { getBookById, deleteBook } from "./BookManager";


export const Book = () => {
    const [ currentUser, setCurrentUser ] = useState()
    const [book, setBook] = useState({publication_date:""})
    const { bookId } = useParams()
    const history = useHistory()

    useEffect(() => {
        getCurrentUser()
            .then(user => setCurrentUser(user))
    }, [])

    useEffect(() => {
        if (bookId) {
            getBookById(bookId)
                .then(book => setBook(book))
        }
    }, [bookId])

    const formatDate = (date) => {
        const dateArray = date.split("-")
        const newDate = dateArray[1] + "/" + dateArray[2] + "/" + dateArray[0]
        return newDate
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
                    <button className="btn btn-2 btn-sep icon-create"
                        onClick={() => {
                            history.push({ pathname: `/orders}` })
                        }}
                    >Add to my order</button>
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