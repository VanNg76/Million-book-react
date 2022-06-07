import React, { useEffect, useState } from "react"
import { getBooks } from "./BookManager"
import { useHistory, Link } from "react-router-dom"

export const BookList = () => {
    const [ books, setBooks ] = useState([])
    const history = useHistory()

    useEffect(() => {
        getBooks()
            .then(data => setBooks(data))
    }, [])

    return (
        <>
            {/* <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/books/new" })
                }}
            >Add Book</button> */}

            <article className="books">
                {
                    books.map(book => {
                        return (
                            <section key={`book--${book.id}`} className="book">
                                <img src={book.cover_image_url} alt={book.title} />
                                <Link className="book__title" to={`/books/${book.id}`}>Title: {book.title}</Link>
                                <div className="book__price">Price: {book.price}</div>
                            </section>
                        )
                    })
                }
            </article>

        </>
        )
}
