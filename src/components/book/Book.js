import React, { useEffect, useState } from "react";
import { getBookById } from "./BookManager";
import { useParams } from "react-router-dom";

export const Book = () => {
    const [book, setBook] = useState({})
    const {bookId} = useParams()

    useEffect(() => {
        if (bookId) {
            getBookById(bookId)
                .then(book => setBook(book))
        }
    }, [bookId])

    return (
        <>
            <section key={`book--${book.id}`} className="book">
                <img src={book.cover_image_url} alt={book.title} />
                <div className="book__introduction">Introduction: {book.introduction}</div>
                <div className="book__price">Price: {book.price}</div>
            </section>
        </>
    )
}