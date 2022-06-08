import React from "react"
import { Route } from "react-router-dom"
import { BookList } from "./book/BookList"
import { Book } from "./book/Book"
import { CreateEditBook } from "./book/CreateEditBook"

export const ApplicationViews = () => {
    return <>
        <main>
            <Route exact path="/books">
                <BookList />
            </Route>
            <Route exact path="/books/:bookId(\d+)">
                <Book />
            </Route>
            <Route exact path="/books/new">
                <CreateEditBook editing={false} />
            </Route>
            <Route exact path="/books/edit/:bookId(\d+)">
                <CreateEditBook editing={true} />
            </Route>
        </main>
    </>
}
