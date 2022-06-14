export const getInventories = () => {
    return fetch(`http://localhost:8000/inventories`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const getInventoryByBookId = (bookId) => {
    return fetch(`http://localhost:8000/inventories?book=${bookId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const createInventory = (newInventory) => {
    return fetch("http://localhost:8000/inventories", {
        method: "POST",
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newInventory)
    })
        .then(response => response.json())
}
