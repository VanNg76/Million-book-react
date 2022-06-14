export const getCurrentUser = () => {
    return fetch("http://localhost:8000/users/0", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}

