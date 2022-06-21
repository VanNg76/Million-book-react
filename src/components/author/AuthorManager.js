export const getAuthors = () => {
    return fetch("https://book-millions.herokuapp.com/authors", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}

export const createAuthor = (newAuthor) => {
    return fetch("https://book-millions.herokuapp.com/authors", {
        method: "POST",
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newAuthor)
    })
        .then(response => response.json())
}

export const deleteAuthor = (authorId) => {
    return fetch(`https://book-millions.herokuapp.com/authors/${authorId}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
}