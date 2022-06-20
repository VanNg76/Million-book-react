export const getOrders = () => {
    return fetch("https://book-millions.herokuapp.com/orders", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}

export const getOrderById = (orderId) => {
    return fetch(`https://book-millions.herokuapp.com/orders/${orderId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}

export const createOrder = (newOrder) => {
    return fetch("https://book-millions.herokuapp.com/orders", {
        method: "POST",
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newOrder)
    })
        .then(response => response.json())
}

export const deleteOrder = (orderId) => {
    return fetch(`https://book-millions.herokuapp.com/orders/${orderId}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
}

export const getOrderBooks = () => {
    return fetch("https://book-millions.herokuapp.com/orderbooks", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}

export const createOrderBook = (newOrderBook) => {
    return fetch("https://book-millions.herokuapp.com/orderbooks", {
        method: "POST",
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newOrderBook)
    })
        .then(response => response.json())
}

export const deleteOrderBook = (orderbookId) => {
    return fetch(`https://book-millions.herokuapp.com/orderbooks/${orderbookId}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
}
