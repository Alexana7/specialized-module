// const p = new Promise(function(resolve, reject) {
//     const rndNumber = Math.random();
//     if (rndNumber > 0.25) {
//         resolve(`успешно выполнился промис ${rndNumber}`)
//     } else {
//         reject(`промис отклонен ${rndNumber}`)
//     }
// })

// p.then(function success(data) {
//     console.log(data)
// })
// .catch(function error(err) {
//     console.log(err)
// })

const DB = {
    users: [
        {
            id: 1,
            name: "Tim",
            age: 30
        },
        {
            id: 2,
            name: "Vasya",
            age: 25
        },
        {
            id: 3,
            name: "Nastya",
            age: 38
        }
    ]
}
const getRndDelay = () => Math.floor(Math.random() * 500) //рандомное число


//создаем функции, которые работают с базой данных: доюавляют, удаляют, изменяют пользователей

// имитируем запрос к базе данных с задержкой
// const getAllUsers = (callback) => {
//     setTimeout(()=> {
//         callback(DB.users)
//     }, getRndDelay())
// }

// добавляет нового пользователя в базу
// const setNewUser = (dataUser, callback) => {
//     setTimeout(()=> {
//         const newUser = {
//              id: Date.now(),
//              ...dataUser //spred-operator для фходящих данных нового юзера. Добавляет все поля по очереди в новый объект
//         }
//         DB.users.push(newUser); //запись в базу
//         callback(newUser) // созданные данные
//     }, getRndDelay())
// }


// обновление данных пользователя

// const updateUserData = (id, dataUserUpdate, callback) => {
//     setTimeout(() => {
//         let updateUser = null;
//         DB.users = DB.users.map(function(user){
//             if (user.id === id) {
//                 updateUser = {...user, ...dataUserUpdate}
//                 return updateUser // возвращаем новый объект, куда по очереди добавляются поля юзера, поля с одинаковыми ключами заменяются на последние добавленные(перезаписываются)
//             }
//             return user;
//         })
//         callback(updateUser)
//     }, getRndDelay())
// }

// setNewUser({name: "Venus", age: 8}, (user)=> {
//     console.log(user);
//     updateUserData(1, {name: "Victor"},(updateUser) => {
//         console.log(updateUser);
//         getAllUsers((dataUsers) => {
//             console.log(dataUsers);
//         })
//     })
// })


// Промисификация

const getAllUsersPromise = () => {
    return new Promise (function(resolve) {
        setTimeout(()=> {
            resolve(DB.users)
        }, getRndDelay())
    })    
}


const setNewUserPromise = (dataUser) => {
    return new Promise(function(resolve) {
        setTimeout(()=> {
            const newUser = {
                 id: Date.now(),
                 ...dataUser //spred-operator для фходящих данных нового юзера. Добавляет все поля по очереди в новый объект
            }
            DB.users.push(newUser); //запись в базу
            resolve(newUser) // созданные данные
        }, getRndDelay())

    })    
};
const updateUserDataPromise = (id, dataUserUpdate) => {
    return new Promise(function(resolve) {
        setTimeout(() => {
            let updateUser = null;
            DB.users = DB.users.map(function(user){
                if (user.id === id) {
                    updateUser = {...user, ...dataUserUpdate}
                    return updateUser // возвращаем новый объект, куда по очереди добавляются поля юзера, поля с одинаковыми ключами заменяются на последние добавленные(перезаписываются)
                }
                return user;
            })
            resolve(updateUser)
        }, getRndDelay())
    })
    
}

// setNewUserPromise({name: "Venus", age: 8})
//     .then((user) => {
//         console.log(user);
//         return updateUserDataPromise(user.id, {name: "Victor"})
//     })
//     .then ((updateUser) => {
//         console.log(updateUser);
//         return getAllUsersPromise()
//     })
//     .then((dataUsers) => {
//         console.log(dataUsers)
//     })

// ******** async/await ****************

// const main = async function() {
//     try {
//         const newUserFromDB = await setNewUserPromise({name: "Ivan", age: 18});
//     console.log(newUserFromDB);

//     const updateUserFromDB = await updateUserDataPromise(newUserFromDB.id, {name: "John"});
//     console.log(updateUserFromDB)
//     const allUsersFromDB = await getAllUsersPromise();
//     console.log(allUsersFromDB)
 
//     } catch (err) {
//         console.log(err)

//     }
    
// }        
// main();

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