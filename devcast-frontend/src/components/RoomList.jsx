import { useEffect, useState } from 'react'
import { listarSalas, criarSala, entrarNaSala } from '../api/api'

export default function RoomList({ user, onEntrar }) {
    const [salas, setSalas] = useState([])
    const [novaSala, setNovaSala] = useState('')

    useEffect(() => {
        listarSalas().then(res => setSalas(res.data))
    }, [])

    const handleCriar = async () => {
        if (!novaSala.trim()) return
        try {
            await criarSala({ name: novaSala, description: '', isPrivate: false, createdBy: user.id })
            setNovaSala('')
            const res = await listarSalas()
            setSalas(res.data)
        } catch (e) {
            alert(e.response?.data?.message || 'Erro ao criar sala')
        }
    }

    const handleEntrar = async (sala) => {
        await entrarNaSala(sala.id, user.id)
        onEntrar(sala)
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <span style={styles.logo}>DevCast</span>
                <span style={styles.userTag}>@{user.username}</span>
            </div>

            <div style={styles.novaArea}>
                <input style={styles.input} placeholder="Nova sala..."
                       value={novaSala}
                       onChange={e => setNovaSala(e.target.value)}
                       onKeyDown={e => e.key === 'Enter' && handleCriar()} />
                <button style={styles.btnCriar} onClick={handleCriar}>+</button>
            </div>

            <div style={styles.lista}>
                {salas.map(sala => (
                    <div key={sala.id} style={styles.sala} onClick={() => handleEntrar(sala)}>
                        <span style={styles.hash}>#</span>
                        <span style={styles.salaNome}>{sala.name}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

const styles = {
    container: { width: '240px', background: '#1e1f2e', height: '100vh', display: 'flex', flexDirection: 'column', borderRight: '1px solid #2d2f3e' },
    header:    { padding: '16px', borderBottom: '1px solid #2d2f3e', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    logo:      { color: '#e2e8f0', fontWeight: '700', fontSize: '16px' },
    userTag:   { color: '#7c3aed', fontSize: '12px' },
    novaArea:  { padding: '12px', display: 'flex', gap: '8px' },
    input:     { flex: 1, padding: '8px', background: '#2d2f3e', border: 'none', borderRadius: '6px', color: '#e2e8f0', fontSize: '13px' },
    btnCriar:  { padding: '8px 12px', background: '#7c3aed', border: 'none', borderRadius: '6px', color: '#fff', cursor: 'pointer', fontSize: '18px' },
    lista:     { flex: 1, overflowY: 'auto', padding: '4px 0' },
    sala:      { padding: '10px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '14px', transition: 'background 0.15s' },
    hash:      { color: '#4b5563', fontSize: '16px' },
    salaNome:  { color: '#94a3b8' }
}