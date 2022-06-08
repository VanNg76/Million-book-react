import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { getBooks, getBooksByCategoryId } from "./BookManager"

import { getCategories } from "../category/CategoryManager"
import { getCurrentUser } from "../user/UserManager"


export const BookList = () => {
    const [currentUser, setCurrentUser] = useState()
    const [ books, setBooks ] = useState([])
    const [ categories, setCategories ] = useState([])
    const [ catId, changeCatId ] = useState(0)
    const [ publicationDate, setPublicationDate] = useState("")
    const [ before, setBefore ] = useState(false)

    const history = useHistory()

    useEffect(() => {
        getCurrentUser()
            .then(user => setCurrentUser(user))
    }, [])

    useEffect(() => {
        getBooks()
            .then(books => setBooks(books))
        getCategories()
            .then(cats => setCategories(cats))
    }, [])

    useEffect(() => {
        if (catId) {
            getBooksByCategoryId(catId)
                .then(books => setBooks(books))
        }
        // else if (publicationDate) {
        //     if (before) {
        //         getBooksBeforePublicationDate()
        //             .then(books => setBooks(books))
        //     }
        //     else {
        //         getBooksAfterPublicationDate()
        //             .then(books => setBooks(books))
        //     }   
        // }
        else {
            getBooks()
                .then(books => setBooks(books))
        }
    }, [catId, publicationDate])

    return (
        <>
            {
                currentUser?.is_staff ?
                    <button className="btn btn-2 btn-sep icon-create"
                        onClick={() => {
                            history.push({ pathname: "/books/new" })
                        }}
                    >Add Book</button>
                : null
            }
            <br></br>

            {/* filter books by choosing a category */}
            <label className="selectCat">Select Category: </label>
            <select id="category" className="dropdown" onChange={
                (event) => {
                    changeCatId(parseInt(event.target.value))
                }
            }>
                <option value="0">All</option>
                {
                    categories.map(category => {
                        return <option key={`categories--${category.id}`} value={category.id}>{category.name}</option>
                    })
                }
            </select>
            <br></br>

            {/* filter books before or after publication date */}
            <label className="selectCat">Choose date: </label>
            <select id="publicationDate" className="dropdown" onChange={
                (event) => {
                    changeCatId(0)
                    if (event.target.value === "1") {
                        setBefore(true)
                    } else {
                        setBefore(false)
                    }
                }
            }>
                <option value="0">No filter</option>
                <option value="1">Before</option>
                <option value="2">After</option>
            </select>

            <input type="date" className="form-control" placeholder="Choose date"
                onChange={(e) => {
                    setPublicationDate(e.target.value)
                }}
            />

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
