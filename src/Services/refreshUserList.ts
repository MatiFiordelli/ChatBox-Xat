import { setUsersListParams } from "../Types"

export const refreshUserList = async (setUsersList: setUsersListParams) => {
    try{
        const req = await fetch('http://localhost:3001/getUsersList')
        const data = await req.json()
        setUsersList(data)

    } catch(e){
        console.log('Error al solicitar la Lista de Usuarios a la API', e)
    }
}