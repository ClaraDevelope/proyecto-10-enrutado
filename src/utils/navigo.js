import Navigo from 'navigo'
import {
  Home,
  infoEvento,
  registroAsistenteUsuario
} from '../pages/home/main/home'
import { Login } from '../pages/login/login'
import {
  formEditarEventos,
  printEventos,
  verAsistentes
} from '../pages/eventos/eventos'
import { formEdit, renderPerfil } from '../pages/usuario/usuario'
import { printRegister } from '../pages/register/register'
import { encontrarEventoPorId } from './variables'
import { registroAsistente } from '../pages/home/asistentes/registroAsistente'

const router = new Navigo()

router.on('/inicio', () => {
  Home()
})

router.on('/login', () => {
  Login()
})

router.on('/login/registro', () => {
  printRegister()
})

router.on('/evento/:id', async (params) => {
  const eventoId = params.data.id
  try {
    const evento = await encontrarEventoPorId(eventoId)
    if (evento) {
      infoEvento(evento)
    } else {
      console.error(`No se encontró ningún evento con el ID ${eventoId}`)
    }
  } catch (error) {
    console.error('Error al buscar el evento:', error)
  }
})

router.on('/mis-eventos', () => {
  printEventos()
})

router.on('/perfil', () => {
  renderPerfil()
})

router.on('/bye', () => {
  const token = localStorage.getItem('token')
  if (!token) {
    console.log('El usuario ya está desconectado.')
    return
  }
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  window.location.href = '/'
})

router.on('/:id/confirmar-asistencia-sin-registro', async (params) => {
  const eventoId = params.data.id
  registroAsistente(eventoId)
})
router.on('/:id/confirmar-asistencia', async (params) => {
  const evento = params.data
  registroAsistenteUsuario(evento)
})

router.on('/editar-perfil', () => {
  formEdit()
})
router.on('/:id/asistentes', async (params) => {
  const eventoId = params.data.id
  const evento = await encontrarEventoPorId(eventoId)
  verAsistentes(evento)
})

router.on('/:id/editar', (params) => {
  const eventoId = params.data.id
  formEditarEventos(eventoId)
})

document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a[href^="/"]')
  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault()
      const href = link.getAttribute('href')
      router.navigate(href)
    })
  })

  const buttons = document.querySelectorAll('button[data-route]')
  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const route = button.getAttribute('data-route')
      router.navigate(route)
    })
  })
})

router.resolve()

export default router
