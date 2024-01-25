import { getSmileysMap } from "./getSmileyMap"
import { PushMessageToContainer } from "../Types"

const validateEachCharacter = (msg:string) => {
    if(msg!==''){
        const validatedMsg = msg.match(/[a-zA-Z 0-9()!¡¿?çÇ/&%$@"',;.:-]/g)
        msg = ''
        validatedMsg?.forEach((e) => msg += e )
    }
    return msg
}

const placeMarkInSmileysCodesPosition = (msg:string, smileyCodesArray:RegExpMatchArray | null) => {
    if(msg!==''){			
        //to indicate where the smileyCodes are positionated, in case of exist . ex:(COOL) vs (???)
        smileyCodesArray?.forEach((e:string) => {
            const checkMatchSmiley = 
                Array.from(getSmileysMap().values()).some((value) => e.toUpperCase() === value )
            
            if(checkMatchSmiley) msg = msg.replace(e, '🚫') 		
        })
    }
    return msg
}

const replaceMarksWithEachProperImgTag = (msg:string, smileyCodesArray:RegExpMatchArray | null) => {
    if(msg!==''){			
        smileyCodesArray?.forEach((e:string)=>{
            for( let [src, codeSmiley] of getSmileysMap().entries() ){
                if(codeSmiley===e.toUpperCase()){
                    msg = msg.replace('🚫', `
                                            <img 
                                                src="${src}" 
                                                style="display:inline" 
                                                alt="${e}" 
                                                title="${e}" 
                                                class="block w-auto sm:w-[3vw] h-auto object-cover aspect-auto"
                                            />`)
                    break
                }
            }
        })
    }
    return msg
}

export const processMessageAndSendToWs = ({msg, ws, nickName}: PushMessageToContainer) => { 
    const msg1 = validateEachCharacter(msg)
    const smileyCodesArray = msg1.match(/\((.*?)\)/g)
    const msg2 = placeMarkInSmileysCodesPosition(msg1, smileyCodesArray)
    const msg3 = replaceMarksWithEachProperImgTag(msg2, smileyCodesArray)

    try { 
        //correction: don't to use nickName, instead use id. and don't send the HTML Element, instead, send fileName.
        const msgObj = {msg: msg3, nickName: nickName}
        const msgStringify = JSON.stringify(msgObj)
        ws?.send(msgStringify)  

    } catch(e){
        alert('No fue posible conectarse al servidor')
    }
}