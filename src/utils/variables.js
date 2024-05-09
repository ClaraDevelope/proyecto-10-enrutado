export const API_URL = 'https://proyecto-10-backend.vercel.app/api/v1'

export const showLoader = (parentElement) => {
  const loader = document.createElement('div')
  loader.className = 'loader'
  const loaderImg = document.createElement('img')
  loaderImg.src =
    'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWZueTR0bWJka3loMzByaGJzOTdndDJnOG95eHRranU5a2V6dHBoZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/iJIqVpSHvF3S9C2JV3/giphy.gif'
  // 'https://media3.giphy.com/media/Tmwjp9NkbKQaK6sGY5/giphy.webp?cid=ecf05e47shgtk3b79az53s1qwzl65h4fdwsl7p5nj9ka7tbz&ep=v1_stickers_search&rid=giphy.webp&ct=s'
  // 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXE1N3FldGM1dG9pODVweDY5cm1uM2Y0ZmQyc2I3b2t6aWU5MnVyOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/YDC5HjHcfFk8lgxXQm/giphy.gif'
  loaderImg.alt = 'Cargando...'
  loaderImg.loading = 'lazy'
  loader.appendChild(loaderImg)
  parentElement.appendChild(loader)
}
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
// export const datosUsuario = JSON.parse(localStorage.getItem('user'))
export let datosActualizadosUsuario = null

export const usuarioId = datosUsuario?._id
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
    // console.log(datosActualizadosUsuario)
    return datosActualizadosUsuario
  } catch (error) {
    console.error('Ha habido un error:', error)
    throw error
  }
}
// llamadaDatosUsuario(usuarioId)
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
