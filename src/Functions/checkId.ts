export default function checkId(user: string | null){
    let id = null

    if(user){
        const userObj = JSON.parse(user)
        id = userObj.id
    } else {
        id = Math.random().toString().split('.')[1] 
    }

    return id
}