import { useState } from 'react'
import { login, cadastrar } from '../api/api'

export default function UserForm({ onAuth }) {
    const [modo, setModo] = useState('login')
    const [form, setForm] = useState({ username: '', email: '', password: '' })
    const [erro, setErro] = useState('')

    const handleSubmit = async () => {
        setErro('')
        try {
            const res = modo === 'login'
                ? await login({ email: form.email, password: form.password })
                : await cadastrar(form)
            onAuth(res.data)
        } catch (e) {
            setErro(e.response?.data?.message || 'Erro ao autenticar')
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>DevCast</h2>
                <p style={styles.sub}>
                    {modo === 'login' ? 'Entrar na conta' : 'Criar conta'}
                </p>

                {modo === 'cadastrar' && (
                    <input style={styles.input} placeholder="Username"
                           value={form.username}
                           onChange={e => setForm({ ...form, username: e.target.value })} />
                )}
                <input style={styles.input} placeholder="Email"
                       value={form.email}
                       onChange={e => setForm({ ...form, email: e.target.value })} />
                <input style={styles.input} placeholder="Senha" type="password"
                       value={form.password}
                       onChange={e => setForm({ ...form, password: e.target.value })}
                       onKeyDown={e => e.key === 'Enter' && handleSubmit()} />

                {erro && <p style={styles.erro}>{erro}</p>}

                <button style={styles.btn} onClick={handleSubmit}>
                    {modo === 'login' ? 'Entrar' : 'Cadastrar'}
                </button>

                <p style={styles.toggle}>
                    {modo === 'login' ? 'Não tem conta?' : 'Já tem conta?'}{' '}
                    <span style={styles.link}
                          onClick={() => setModo(modo === 'login' ? 'cadastrar' : 'login')}>
            {modo === 'login' ? 'Cadastrar' : 'Entrar'}
          </span>
                </p>
            </div>
        </div>
    )
}

const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#1a1a2e' },
    card:      { background: '#16213e', padding: '40px', borderRadius: '12px', width: '360px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' },
    title:     { color: '#e2e8f0', margin: '0 0 4px', fontSize: '24px', fontWeight: '700' },
    sub:       { color: '#94a3b8', margin: '0 0 24px', fontSize: '14px' },
    input:     { width: '100%', padding: '12px', marginBottom: '12px', background: '#0f3460', border: '1px solid #334155', borderRadius: '8px', color: '#e2e8f0', fontSize: '14px', boxSizing: 'border-box' },
    btn:       { width: '100%', padding: '12px', background: '#7c3aed', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '15px', fontWeight: '600', cursor: 'pointer' },
    erro:      { color: '#f87171', fontSize: '13px', marginBottom: '12px' },
    toggle:    { color: '#94a3b8', fontSize: '13px', textAlign: 'center', marginTop: '16px' },
    link:      { color: '#7c3aed', cursor: 'pointer', fontWeight: '600' }
}