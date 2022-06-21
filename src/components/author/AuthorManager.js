export const getAuthors = () => {
    return fetch("http://localhost:8000/authors", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}

export const createAuthor = (newAuthor) => {
    return fetch("http://localhost:8000/authors", {
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
    return fetch(`http://localhost:8000/authors/${authorId}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
}