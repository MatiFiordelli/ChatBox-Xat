import capitalizeText from "./capitalizeText"
import checkId from "./checkId"

export default function getUserOBJFromLocalStorage(user: string | null, nickName: string){
    const nickNameCapitalized = capitalizeText(nickName)
    const id = checkId(user)
    
    return {nickName: nickNameCapitalized, id: id}
}