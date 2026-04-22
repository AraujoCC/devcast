import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8001/api'
})

export const cadastrar = (data) => api.post('/users/cadastrar', data)
export const login     = (data) => api.post('/users/login', data)
export const logout    = (userId) => api.post(`/users/${userId}/logout`)

export const listarSalas  = () => api.get('/rooms')
export const criarSala    = (data) => api.post('/rooms', data)
export const entrarNaSala = (roomId, userId) =>
    api.post(`/rooms/${roomId}/entrar?userId=${userId}`)

export default api