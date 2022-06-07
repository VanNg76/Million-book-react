import React from "react"
import { Route } from "react-router-dom"
import { BookList } from "./book/BookList"
import { Book } from "./book/Book"

export const ApplicationViews = () => {
    return <>
        <main>
            <Route exact path="/books">
                <BookList />
            </Route>
            <Route exact path="/books/:bookId(\d+)">
                <Book />
            </Route>
        </main>
    </>
}
