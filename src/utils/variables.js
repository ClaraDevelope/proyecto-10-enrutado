export const API_URL = 'https://proyecto-10-backend.vercel.app/api/v1'

export const token = localStorage.getItem('token')
export const usuarioData = localStorage.getItem('user', JSON.stringify())
export const User = !!token && usuarioData
export let datosUsuario = obtenerDatosUsuario()
function obtenerDatosUsuario() {
  return JSON.parse(localStorage.getItem('user')) || {}
}
export function actualizarDatosUsuario() {
  datosUsuario = obtenerDatosUsuario()
}
export let datosActualizadosUsuario = null
export const usuarioId = datosUsuario?._id
export const encontrarEventoPorId = async (eventoId) => {
  try {
    const response = await fetch(API_URL + `/eventos/${eventoId}`)
    if (response.ok) {
      const evento = await response.json()
      return evento
    } else {
      console.error('No se pudo encontrar el evento')
      return null
    }
  } catch (error) {
    console.error('Error al buscar el evento:', error)
    return null
  }
}
