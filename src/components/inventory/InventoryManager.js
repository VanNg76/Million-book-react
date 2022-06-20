export const getInventories = () => {
    return fetch(`https://book-millions.herokuapp.com/inventories`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const getInventoryByBookId = (bookId) => {
    return fetch(`https://book-millions.herokuapp.com/inventories?book=${bookId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const createInventory = (newInventory) => {
    return fetch("https://book-millions.herokuapp.com/inventories", {
        method: "POST",
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newInventory)
    })
        .then(response => response.json())
}
