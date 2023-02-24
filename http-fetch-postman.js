//************Fetch **************** 

// fetch("https://jsonplaceholder.typicode.com/todos/")
//     .then (res => {
//         return res.ok ? res.json() : Promise.reject("Server's error");
//     })
//     .then(data => {
//         console.log(data)
//     })
//     .catch(err => {
//         console.log(err)
//     })

// fetch через async/await
async function getQueryRandom() {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos/"); //получили ответ о статусе (ok: true/false)
        const data = res.ok ? await res.json() : await Promise.reject("Server's error"); //дождались загрузки данных (из body: ...)
        console.log(data)
    } catch (err) {
        console.log(err)
    }
}   
getQueryRandom()

fetch("https://sb-cats.herokuapp.com/api/show/id")
.then(res => {
   return res.ok ? res.json() : Promise.reject()})
   .then(data => {
    console.log(data)
   })


function updateData(id, data) {
return fetch(`https://sb-cats.herokuapp.com/api/update/${id}`, {
    method: 'PUT',
    headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify(data)
})
    .then(res => {
        return res.ok ? res.json() : Promise.reject()
    })
}
