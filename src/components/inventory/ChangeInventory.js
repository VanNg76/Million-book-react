import React, { useEffect, useState } from "react";
import { createInventory } from "./InventoryManager"; 
import { getBooks } from "../book/BookManager";


export const ChangeInventory = () => {
    const [ form, updateForm ] = useState({ book_id: 0, quantity: 0 })
    const [ books, setBooks ] = useState([])

    useEffect(() => {
        getBooks()
            .then(books => setBooks(books))
    }, [])

    const submitInventory = (e) => {
        e.preventDefault()
        const newInventory = {
            quantity: form.quantity,
            book_id: form.book_id
        }
        createInventory(newInventory)
            // .then(() => history.push(`/inventories`))
    }

    const handleInputChange = (event) => {
        const copy = { ...form }
        copy[event.target.name] = parseInt(event.target.value)
        updateForm(copy)
    }


    return (
        <form className="box">
            <div className="field">
                <label className="label">Select a book:</label>
                <div className="select is-primary">
                    <select name="book_id" 
                        value={form.book_id}
                        onChange={handleInputChange}
                    >
                        <option value="0">All</option>
                        {
                            books.map(book => {
                                return (
                                    <option key={`book--${book.id}`} value={book.id}>
                                        ID={book.id} -- {book.title}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>

            <div className="field">
                <label className="label">Quantity:</label>
                <input name="quantity" type="number" placeholder="quantity" value={form.quantity}
                    onChange={handleInputChange} className="input is-primary"
            />
            </div>

            <button className="button is-dark"
                onClick={(e) => {
                    submitInventory(e)
                    updateForm({ quantity: 0, book_id: 0 })
                }}>
            Submit</button>
        </form>
    )
}