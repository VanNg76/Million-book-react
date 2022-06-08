export const getBooks = () => {
    return fetch("http://localhost:8000/books", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}

export const getBookById = (id) => {
    return fetch(`http://localhost:8000/books/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const getBooksByCategoryId = (catId) => {
    return fetch(`http://localhost:8000/books?category=${catId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const getBooksPublishedBeforeDate = (date) => {
    return fetch(`http://localhost:8000/books?published_date=${date}&before=true`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const getBooksPublishedAfterDate = (date) => {
    return fetch(`http://localhost:8000/books?published_date=${date}&before=false`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const getBooksBySearchTitle = (searchTitle) => {
    return fetch(`http://localhost:8000/books?title=${searchTitle}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const getBooksBySearchAuthorName = (name) => {
    return fetch(`http://localhost:8000/books?author_name=${name}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}
