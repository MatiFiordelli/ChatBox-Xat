import { createWebsocketParams } from "../Types"
import wsUrl from "./webSocket"

export const createWebsocket = async ({ws, wsId}: createWebsocketParams) => {
    ws.current?.readyState!==1 && 
        ws.current?.readyState!==0 && 
            (ws.current = new WebSocket(wsUrl, wsId))
}