import { useState, useEffect, useRef } from 'react'
import { useWebSocket } from '../hooks/useWebSocket'

export default function Chat({ user, sala, onVoltar }) {
    const [mensagens, setMensagens] = useState([])
    const [texto, setTexto] = useState('')
    const bottomRef = useRef(null)

    const { conectado, enviar } = useWebSocket(sala.id, (msg) => {
        setMensagens(prev => [...prev, msg])
    })

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [mensagens])

    const handleEnviar = () => {
        if (!texto.trim() || !conectado) return
        enviar({ roomId: sala.id, senderId: user.id, content: texto })
        setTexto('')
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button style={styles.btnVoltar} onClick={onVoltar}>←</button>
                <span style={styles.salaName}># {sala.name}</span>
                <span style={{ ...styles.status, color: conectado ? '#4ade80' : '#f87171' }}>
          {conectado ? '● conectado' : '○ reconectando...'}
        </span>
            </div>

            <div style={styles.mensagens}>
                {mensagens.map((m, i) => (
                    <div key={i} style={styles.msg}>
            <span style={{
                ...styles.autor,
                color: m.senderUsername === user.username ? '#7c3aed' : '#60a5fa'
            }}>
              {m.senderUsername}
            </span>
                        <span style={styles.content}>{m.content}</span>
                        <span style={styles.hora}>
              {new Date(m.sentAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </span>
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            <div style={styles.inputArea}>
                <input style={styles.input}
                       placeholder={`Mensagem em #${sala.name}`}
                       value={texto}
                       onChange={e => setTexto(e.target.value)}
                       onKeyDown={e => e.key === 'Enter' && handleEnviar()} />
                <button style={styles.btnEnviar} onClick={handleEnviar}>Enviar</button>
            </div>
        </div>
    )
}

const styles = {
    container:  { flex: 1, display: 'flex', flexDirection: 'column', background: '#1a1b2e', height: '100vh' },
    header:     { padding: '16px 20px', borderBottom: '1px solid #2d2f3e', display: 'flex', alignItems: 'center', gap: '12px' },
    btnVoltar:  { background: 'none', border: 'none', color: '#94a3b8', fontSize: '18px', cursor: 'pointer' },
    salaName:   { color: '#e2e8f0', fontWeight: '600', fontSize: '16px', flex: 1 },
    status:     { fontSize: '12px' },
    mensagens:  { flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '8px' },
    msg:        { display: 'flex', alignItems: 'baseline', gap: '8px' },
    autor:      { fontWeight: '600', fontSize: '14px', minWidth: 'fit-content' },
    content:    { color: '#cbd5e1', fontSize: '14px', flex: 1 },
    hora:       { color: '#4b5563', fontSize: '11px', minWidth: 'fit-content' },
    inputArea:  { padding: '16px 20px', borderTop: '1px solid #2d2f3e', display: 'flex', gap: '8px' },
    input:      { flex: 1, padding: '12px', background: '#2d2f3e', border: 'none', borderRadius: '8px', color: '#e2e8f0', fontSize: '14px' },
    btnEnviar:  { padding: '12px 20px', background: '#7c3aed', border: 'none', borderRadius: '8px', color: '#fff', cursor: 'pointer', fontWeight: '600' }
}