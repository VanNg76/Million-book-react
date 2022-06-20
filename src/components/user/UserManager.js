export const getCurrentUser = () => {
    return fetch("https://book-millions.herokuapp.com/users/0", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}

