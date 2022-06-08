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

// export const getBooksBeforePublicationDate = (pubDate) => {
//     return fetch(`http://localhost:8000/books?publicate_date=${pubDate}`, {
//         headers: {
//             "Authorization": `Token ${localStorage.getItem("token")}`
//         }
//     })
//         .then(res => res.json())
// }
