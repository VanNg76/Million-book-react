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

    const formatDate = (date) => {
        const dateArray = date.split("-")
        const newDate = dateArray[1] + "/" + dateArray[2] + "/" + dateArray[0]
        return newDate
    }

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
            <select id="category" className="dropdown" value={catId} onChange={
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
            <br></br>

            {/* filter books before or after publication date */}
            <label className="selectCat">Filter by publication date: </label>
            <select id="publicationDate" className="dropdown" onChange={
                (event) => {
                    if (event.target.value === "1") {
                        setBefore(true)
                    } else {
                        setBefore(false)
                    }
                }
            }>
                <option value="0">Choose</option>
                <option value="1">Before</option>
                <option value="2">After</option>
            </select>

            <input type="date" className="form-control" placeholder="Choose date" value={publishedDate}
                onChange={(e) => {
                    changeCatId(0)
                    setSearchTitle("")
                    setSearchAuthor("")
                    setPublishedDate(e.target.value)
                }}
            />

            <button className="resetDate"
                onClick={() => {
                    setPublishedDate("")
                }}
            >No filter</button>
            <br></br>

            {/* filter books by search title */}
            <label className="searchTitle">Enter search text for book title: </label>
            <input type="text" className="form-control" placeholder="Input text" value={searchTitle}
                onChange={(e) => {
                    changeCatId(0)
                    setPublishedDate("")
                    setSearchAuthor("")
                    setSearchTitle(e.target.value)
                }}
            />
            <br></br>

            {/* filter books by search author name */}
            <label className="searchAuthor">Enter search text for author name: </label>
            <input type="text" className="form-control" placeholder="Input text" value={searchAuthor}
                onChange={(e) => {
                    changeCatId(0)
                    setPublishedDate("")
                    setSearchTitle("")
                    setSearchAuthor(e.target.value)
                }}
            />
            <br></br>

            {/* display books after filter by individual condition */}
            <article className="books">
                {
                    books.map(book => {
                        return (
                            <section key={`book--${book.id}`} className="book">
                                <Link to={`/books/${book.id}`}>
                                    <img src={book.cover_image_url} alt={book.title} />
                                </Link>
                                <div className="book__title">Title: {book.title}</div>
                                <div className="book__publicationDate">Publication date: {formatDate(book.publication_date)}</div>
                                <div className="book__price">Price: {book.price}</div>
                            </section>
                        )
                    })
                }
            </article>

        </>
    )
}
