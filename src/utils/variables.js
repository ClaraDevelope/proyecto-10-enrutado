export const API_URL = 'https://proyecto-10-backend.vercel.app/api/v1'

const token = localStorage.getItem('token')
const usuarioData = localStorage.getItem('user', JSON.stringify())
export const User = !!token && usuarioData

export const datosUsuario = JSON.parse(
  localStorage.getItem('user', JSON.stringify())
)
export let datosActualizadosUsuario = null

const usuarioId = datosUsuario?._id
const llamadaDatosUsuario = async (usuarioId) => {
  const opciones = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }

  try {
    const response = await fetch(`${API_URL}/auth/${usuarioId}`, opciones)
    if (!response.ok) {
      throw new Error('Error al obtener los datos del usuario')
    }
    datosActualizadosUsuario = await response.json()
    console.log(datosActualizadosUsuario)
    return datosActualizadosUsuario
  } catch (error) {
    console.error('Ha habido un error:', error)
    throw error
  }
}
llamadaDatosUsuario(usuarioId)
