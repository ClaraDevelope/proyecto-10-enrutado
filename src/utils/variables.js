export const API_URL = 'https://proyecto-10-backend.vercel.app/api/v1'
const token = localStorage.getItem('token')
const usuarioData = localStorage.getItem('user', JSON.stringify())
export const User = !!token && usuarioData
