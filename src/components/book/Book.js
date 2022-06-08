import React, { useEffect, useState } from "react";
import { getBookById } from "./BookManager";
import { useParams } from "react-router-dom";

export const Book = () => {
    const [book, setBook] = useState({publication_date:""})
    const { bookId } = useParams()

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
        <section key={`book--${book.id}`} className="book">
            <img src={book.cover_image_url} alt={book.title} />
            <div className="book__introduction">Introduction: {book.introduction}</div>
            <div className="book__publicationDate">Publication date: {formatDate(book.publication_date)}</div>
            <div className="book__authorName">Author name: {book.author?.name}</div>
            <div className="book__price">Price: {book.price}</div>
        </section>
    )
}