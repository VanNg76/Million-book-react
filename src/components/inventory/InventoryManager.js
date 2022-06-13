export const getInventoryByBookId = (bookId) => {
    return fetch(`http://localhost:8000/inventories?book=${bookId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}
