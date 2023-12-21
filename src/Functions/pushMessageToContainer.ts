import { getSmileysMap } from "./getSmileyMap"
import { setMessageInput } from "../Redux/actions"
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

export const pushMessageToContainer = ({msg, msgContainerDivRef, messageInputRef, dispatch, ws, nickName}: PushMessageToContainer) => { 
    const msg1 = validateEachCharacter(msg)
    const smileyCodesArray = msg1.match(/\((.*?)\)/g)
    const msg2 = placeMarkInSmileysCodesPosition(msg1, smileyCodesArray)
    const msg3 = replaceMarksWithEachProperImgTag(msg2, smileyCodesArray)
    let msg4 = null

    try { 
        const msg = JSON.stringify({msg: msg3})
        ws.send(msg)  

        ws.onmessage = (e) => {
            msg4 = JSON.parse(e.data).msg

            if(msg4!==''){			
                const msgHTMLElement = `
                                        <p style="font-weight:bold;">${nickName}</p>
                                        <div style="margin-bottom:0.7rem; display:inline-block;">${msg4}</div>
                                        `

                if(msgContainerDivRef?.current){
                    msgContainerDivRef.current.innerHTML += msgHTMLElement
                    msgContainerDivRef.current.scrollTop = msgContainerDivRef.current.scrollHeight
                }       
            }
        
            dispatch(setMessageInput(''))
            messageInputRef?.current?.focus()
        }
    } catch(e){
        alert('No fue posible conectarse al servidor')
    }
}