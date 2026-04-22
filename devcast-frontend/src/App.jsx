import { useState } from 'react'
import UserForm from './components/UserForm'
import RoomList from './components/RoomList'
import Chat from './components/Chat'

export default function App() {
  const [user, setUser]   = useState(null)
  const [sala, setSala]   = useState(null)

  if (!user) return <UserForm onAuth={setUser} />

  return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <RoomList user={user} onEntrar={setSala} />
        {sala
            ? <Chat user={user} sala={sala} onVoltar={() => setSala(null)} />
            : <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a1b2e', color: '#4b5563', fontSize: '15px' }}>
              Selecione uma sala para começar
            </div>
        }
      </div>
  )
}