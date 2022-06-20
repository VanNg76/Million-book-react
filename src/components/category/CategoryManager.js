export const getCategories = () => {
    return fetch("https://book-millions.herokuapp.com/categories", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}

export const createCategory = (newCategory) => {
    return fetch("https://book-millions.herokuapp.com/categories", {
        method: "POST",
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCategory)
    })
        .then(response => response.json())
}