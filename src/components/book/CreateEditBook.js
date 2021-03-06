import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { getBookById } from "./BookManager";
import { getAuthors } from "../author/AuthorManager";
import { updateBook, createBook } from "./BookManager";


export const CreateEditBook = ({edit}) => {
    const [ authors, setAuthors ] = useState([])
    const [ editBook, updateEditBook ] = useState({ author_id: 0 })
    const history = useHistory()
    const { bookId } = useParams()

    useEffect(() => {
        getAuthors()
            .then(authors => setAuthors(authors))
    },[])

    useEffect(() => {
        if (edit) {
            if (bookId) {
                getBookById(bookId)
                    .then((res) => {
                        res.author_id = res.author.id
                        updateEditBook(res)
                    } )
            }
        }
    }, [bookId])

    const handleControlledInputChange = (event) => {
        const copy = { ...editBook }
        copy[event.target.name] = event.target.value
        updateEditBook(copy)
    }

    const submitBook = (e) => {
        e.preventDefault()

        const newBook = {
            title: editBook.title,
            introduction: editBook.introduction,
            cover_image_url: editBook.cover_image_url,
            publication_date: editBook.publication_date,
            price: editBook.price,
            author_id: parseInt(editBook.author_id)
        }
        if (edit) {
            newBook.id = parseInt(bookId)
            updateBook(newBook)
                .then(() => history.push("/books"))
        } else {
            createBook(newBook)
                .then(() => history.push("/books"))
        }
    }

    return (
        <form className="box">
            <div className="field">
                <label>Book title:</label>
                <input name="title" type="text" placeholder="title" value={editBook.title}
                    className="input is-primary" onChange={handleControlledInputChange}
                />
            </div>
            <div className="field">
                <label>Introduction:</label>
                <textarea name="introduction" placeholder="introduction" value={editBook.introduction}
                    className="textarea is-primary" onChange={handleControlledInputChange}
                />
            </div>
            <div className="field">
                <label>Image URL:</label>
                <textarea name="cover_image_url" placeholder="image URL" value={editBook.cover_image_url}
                    className="textarea is-primary" onChange={handleControlledInputChange}
                />
            </div>
            <div className="field">
                <label>Publication date:</label>
                <input name="publication_date" type="date" value={editBook.publication_date}
                    className="input is-primary" placeholder="mm/dd/yyyy" onChange={handleControlledInputChange}
                />
            </div>
            <div className="field">
                <label>Price:</label>
                <input name="price" type="number" placeholder="$0.00" value={editBook.price}
                    className="input is-primary" onChange={handleControlledInputChange}
                />
            </div>
            <div className="field">
                <label>Select Author:</label>
                <br></br>
                <div className="select is-primary">
                    <select name="author_id"
                    value={editBook.author_id}
                    onChange={handleControlledInputChange}>
                        {
                            authors.map(author => {
                                return (
                                    <option key={`author--${author.id}`} value={author.id}>
                                        {author.name}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>

            <button className="button is-dark" onClick={(e) => {
                submitBook(e)
            }}>
                Submit
            </button>
        </form>
    )
}