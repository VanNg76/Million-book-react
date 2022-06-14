export const getOrders = () => {
    return fetch("http://localhost:8000/orders", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}

export const getOrderById = (orderId) => {
    return fetch(`http://localhost:8000/orders/${orderId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}

export const createOrder = (newOrder) => {
    return fetch("http://localhost:8000/orders", {
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
    return fetch(`http://localhost:8000/orders/${orderId}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
}

export const getOrderBooks = () => {
    return fetch("http://localhost:8000/orderbooks", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}

export const createOrderBook = (newOrderBook) => {
    return fetch("http://localhost:8000/orderbooks", {
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
    return fetch(`http://localhost:8000/orderbooks/${orderbookId}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
}
