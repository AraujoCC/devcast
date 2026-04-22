import { useEffect, useRef, useState } from 'react'
import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'

export function useWebSocket(roomId, onMessage) {
    const clientRef = useRef(null)
    const [conectado, setConectado] = useState(false)

    useEffect(() => {
        if (!roomId) return

        const client = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8001/ws'),
            onConnect: () => {
                setConectado(true)
                client.subscribe(`/topic/sala.${roomId}`, (msg) => {
                    const data = JSON.parse(msg.body)
                    onMessage(data)
                })
            },
            onDisconnect: () => setConectado(false),
        })

        client.activate()
        clientRef.current = client

        return () => client.deactivate()
    }, [roomId])

    const enviar = (payload) => {
        if (clientRef.current?.connected) {
            clientRef.current.publish({
                destination: `/app/chat/${roomId}`,
                body: JSON.stringify(payload)
            })
        }
    }

    return { conectado, enviar }
}