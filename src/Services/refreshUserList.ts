import { setUsersListParams } from "../Types"
import crudUrl from "./apiCrudForUsers"

export const refreshUserList = async (setUsersList: setUsersListParams) => {
    try{
        const req = await fetch(`${crudUrl}getUsersList`)
        const data = await req.json()
        setUsersList(data)

    } catch(e){
        console.log('Error al solicitar la Lista de Usuarios a la API', e)
    }
}