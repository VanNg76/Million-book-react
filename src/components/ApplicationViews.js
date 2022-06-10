import React from "react"
import { Route } from "react-router-dom"
import { BookList } from "./book/BookList"
import { Book } from "./book/Book"
import { CreateEditBook } from "./book/CreateEditBook"
import { CreateAuthor } from "./author/CreateAuthor"
import { AuthorList } from "./author/AuthorList"
import { CreateCategory } from "./category/CreateCategory"
import { CategoryList } from "./category/CategoryList"
import { OrderList } from "./orders/OrderList"


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
                <CreateEditBook edit={false} />
            </Route>
            <Route exact path="/books/edit/:bookId(\d+)">
                <CreateEditBook edit={true} />
            </Route>
            <Route exact path="/categories">
                <CategoryList />
            </Route>
            <Route exact path="/categories/new">
                <CreateCategory />
            </Route>
            <Route exact path="/authors">
                <AuthorList />
            </Route>
            <Route exact path="/authors/new">
                <CreateAuthor />
            </Route>
            <Route exact path="/orders">
                <OrderList />
            </Route>
        </main>
    </>
}
