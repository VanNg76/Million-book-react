import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { getBooks, getBooksByCategoryId } from "./BookManager"
import { getBooksPublishedBeforeDate, getBooksPublishedAfterDate } from "./BookManager"
import { getBooksBySearchTitle, getBooksBySearchAuthorName } from "./BookManager"
import { getCategories } from "../category/CategoryManager"
import { getCurrentUser } from "../user/UserManager"
import "./Book.css"


export const BookList = () => {
    const [ currentUser, setCurrentUser ] = useState()
    const [ books, setBooks ] = useState([])
    const [ categories, setCategories ] = useState([])
    const [ catId, changeCatId ] = useState(0)
    const [ publishedDate, setPublishedDate ] = useState("")
    const [ before, setBefore ] = useState(false)
    const [ searchTitle, setSearchTitle ] = useState("")
    const [ searchAuthor, setSearchAuthor ] = useState("")


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
        else if (publishedDate) {
            if (before) {
                getBooksPublishedBeforeDate(publishedDate)
                    .then(books => setBooks(books))
            }
            else {
                getBooksPublishedAfterDate(publishedDate)
                    .then(books => setBooks(books))
            }   
        }
        else if (searchTitle) {
            getBooksBySearchTitle(searchTitle)
                .then(books => setBooks(books))
        }
        else if (searchAuthor) {
            getBooksBySearchAuthorName(searchAuthor)
                .then(books => setBooks(books))
        }
        else {
            getBooks()
                .then(books => setBooks(books))
        }
    }, [catId, publishedDate, searchTitle, searchAuthor])


    return (
        <>
            {
                currentUser?.is_staff ?
                    <button className="button is-dark"
                        onClick={() => {
                            history.push({ pathname: "/books/new" })
                        }}
                    >Add Book</button>
                : null
            }
            <table className="table mt-4">
                <tbody>
                    <tr>
                        {/* filter books by choosing a category */}
                        <td>Filter by Category:</td>
                        <td>
                            <select id="category" value={catId} onChange={
                                (event) => {
                                    setPublishedDate("")
                                    setSearchTitle("")
                                    setSearchAuthor("")
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
                        </td>
                    </tr>

                    <tr>
                        {/* filter books before or after publication date */}
                        <td>Filter by Publication Date: </td>
                        <td>
                            <select id="publicationDate" onChange={
                                (event) => {
                                    if (event.target.value === "1") {
                                        setBefore(true)
                                    } else {
                                        setBefore(false)
                                    }
                                }
                            }>
                                <option value="0">Option</option>
                                <option value="1">Before</option>
                                <option value="2">After</option>
                            </select>
                            <input type="date" className="ml-3" placeholder="Choose date" value={publishedDate}
                                onChange={(e) => {
                                    changeCatId(0)
                                    setSearchTitle("")
                                    setSearchAuthor("")
                                    setPublishedDate(e.target.value)
                                }}
                            />
                            <button className="ml-3"
                                onClick={() => {
                                    setPublishedDate("")
                                }}
                            >No filter</button>
                        </td>
                    </tr>

                    <tr>
                        {/* Search by title */}
                        <td>Search by Title: </td>
                        <td>
                            <input type="text" placeholder="Input title" value={searchTitle}
                                onChange={(e) => {
                                    changeCatId(0)
                                    setPublishedDate("")
                                    setSearchAuthor("")
                                    setSearchTitle(e.target.value)
                                }}
                            />
                        </td>
                    </tr>

                    <tr>
                        {/* Search by author name */}
                        <td>Search by Author Name: </td>
                        <td>
                            <input type="text" placeholder="Input name" value={searchAuthor}
                                onChange={(e) => {
                                    changeCatId(0)
                                    setPublishedDate("")
                                    setSearchTitle("")
                                    setSearchAuthor(e.target.value)
                                }}
                            />
                        </td>
                    </tr>
                    <tr></tr>
                </tbody>
            </table>

            {/* display books after filter by individual condition */}
            <div className="columns is-multiline">
                {
                    books.map(book => {
                        return (
                                <div key={`book--${book.id}`} className="column is-one-fifth">
                                    <Link to={`/books/${book.id}`} className="is-align-content-center">
                                        <img src={book.cover_image_url} className="box image--booklist" alt={book.title} />
                                    </Link>
                                    <div className="has-text-weight-bold has-text-link">{book.title}</div>
                                    <div className="is-italic has-text-link">by {book.author.name}</div>
                                    <div className="has-text-weight-bold has-text-warning">${book.price}</div>
                                </div>
                        )
                    })
                }
            </div>

        </>
    )
}
