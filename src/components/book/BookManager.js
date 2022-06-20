export const getBooks = () => {
    return fetch("https://book-millions.herokuapp.com/books", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}

export const getBookById = (id) => {
    return fetch(`https://book-millions.herokuapp.com/books/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const getBooksByCategoryId = (catId) => {
    return fetch(`https://book-millions.herokuapp.com/books?category=${catId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const getBooksPublishedBeforeDate = (date) => {
    return fetch(`https://book-millions.herokuapp.com/books?published_date=${date}&before=true`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const getBooksPublishedAfterDate = (date) => {
    return fetch(`https://book-millions.herokuapp.com/books?published_date=${date}&before=false`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const getBooksBySearchTitle = (searchTitle) => {
    return fetch(`https://book-millions.herokuapp.com/books?title=${searchTitle}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const getBooksBySearchAuthorName = (name) => {
    return fetch(`https://book-millions.herokuapp.com/books?author_name=${name}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const createBook = (newBook) => {
    return fetch("https://book-millions.herokuapp.com/books", {
        method: "POST",
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newBook)
    })
        .then(response => response.json())
}

export const updateBook = (newBook) => {
    return fetch(`https://book-millions.herokuapp.com/books/${newBook.id}`, {
        method: "PUT",
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newBook)
    })
}

export const deleteBook = (bookId) => {
    return fetch(`https://book-millions.herokuapp.com/books/${bookId}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
}
